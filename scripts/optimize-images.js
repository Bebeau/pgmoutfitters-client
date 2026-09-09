/**
 * Compress oversized raster sources and emit WebP/AVIF + width variants.
 *
 * Usage: node scripts/optimize-images.js
 *
 * Writes:
 *   - resized/recompressed originals in place (png/jpg only)
 *   - sibling variants: {name}.w{width}.{webp|avif|png|jpg}
 *   - full-size modern siblings for CSS backgrounds: {name}.webp / {name}.avif
 *   - src/assets/img/responsiveImages.generated.ts (webpack imports for used images)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_ROOT = path.join(ROOT, 'src', 'assets', 'img');
const SRC_ROOT = path.join(ROOT, 'src');
const GENERATED = path.join(IMG_ROOT, 'responsiveImages.generated.ts');

const WIDTHS = [480, 800, 1200, 1600];
const MAX_LONG_EDGE = 1600;
const JPEG_QUALITY = 78;
const WEBP_QUALITY = 72;
const AVIF_QUALITY = 45;
const VARIANT_SUFFIX = /\.w\d+\.(webp|avif|png|jpe?g)$/i;

const IMPORT_RE = /from\s+['"]([^'"]+\.(?:png|jpe?g))['"]/gi;
const URL_RE = /url\(\s*['"]?([^'")]+?\.(?:png|jpe?g))['"]?\s*\)/gi;

function walk(dir, filter) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full, filter));
    } else if (filter(full)) {
      out.push(full);
    }
  }
  return out;
}

function isSourceRaster(file) {
  if (VARIANT_SUFFIX.test(file)) {
    return false;
  }
  return /\.(png|jpe?g)$/i.test(file);
}

function resolveFrom(file, spec) {
  if (spec.startsWith('http') || spec.startsWith('data:')) {
    return null;
  }
  const abs = path.resolve(path.dirname(file), spec);
  return fs.existsSync(abs) ? abs : null;
}

function collectUsedImages() {
  const used = new Set();
  const files = walk(SRC_ROOT, (file) =>
    /\.(ts|tsx|js|jsx|scss)$/.test(file) && !file.endsWith('.generated.ts')
  );

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    for (const re of [IMPORT_RE, URL_RE]) {
      re.lastIndex = 0;
      let match;
      while ((match = re.exec(text))) {
        const resolved = resolveFrom(file, match[1]);
        if (resolved && isSourceRaster(resolved)) {
          used.add(resolved);
        }
      }
    }
  }
  return used;
}

function shouldSkipVariants(file) {
  return file.includes(`${path.sep}icons${path.sep}`);
}

function variantPath(file, width, ext) {
  const parsed = path.parse(file);
  return path.join(parsed.dir, `${parsed.name}.w${width}.${ext}`);
}

function modernSibling(file, ext) {
  const parsed = path.parse(file);
  return path.join(parsed.dir, `${parsed.name}.${ext}`);
}

function fallbackExt(format) {
  return format === 'png' ? 'png' : 'jpg';
}

async function main() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (err) {
    console.error('sharp is required. Run npm install first.');
    throw err;
  }

  const used = collectUsedImages();
  const sources = walk(IMG_ROOT, isSourceRaster);
  const records = [];

  console.log(`Found ${sources.length} raster sources, ${used.size} referenced by app/CSS.`);

  for (const file of sources) {
    const rel = path.relative(ROOT, file);
    const input = sharp(file, { failOn: 'none' }).rotate();
    const meta = await input.metadata();
    if (!meta.width || !meta.height) {
      console.warn(`Skipping (no dimensions): ${rel}`);
      continue;
    }

    const format = meta.format === 'png' ? 'png' : 'jpeg';
    const longEdge = Math.max(meta.width, meta.height);
    const scale = longEdge > MAX_LONG_EDGE ? MAX_LONG_EDGE / longEdge : 1;
    const outWidth = Math.round(meta.width * scale);
    const outHeight = Math.round(meta.height * scale);

    const base = input.clone().resize({
      width: outWidth,
      height: outHeight,
      fit: 'inside',
      withoutEnlargement: true,
    });

    const encodeOriginal = (pipeline) =>
      format === 'png'
        ? pipeline.png({ compressionLevel: 9, adaptiveFiltering: true })
        : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

    const originalBuffer = await encodeOriginal(base.clone()).toBuffer();
    const originalBytes = fs.statSync(file).size;
    if (originalBuffer.length < originalBytes || scale < 1) {
      fs.writeFileSync(file, originalBuffer);
      console.log(
        `source  ${rel}  ${meta.width}x${meta.height} ${(originalBytes / 1024).toFixed(0)}K → ${outWidth}x${outHeight} ${(originalBuffer.length / 1024).toFixed(0)}K`
      );
    }

    const emitVariants = used.has(file) && !shouldSkipVariants(file);
    if (!emitVariants) {
      continue;
    }

    const widths = [...new Set([...WIDTHS.filter((w) => w < outWidth), outWidth])].sort(
      (a, b) => a - b
    );
    const fallback = fallbackExt(format);
    const fallbackEntries = [];
    const webpEntries = [];
    const avifEntries = [];

    for (const width of widths) {
      const resized = base.clone().resize({ width, withoutEnlargement: true });
      const webpPath = variantPath(file, width, 'webp');
      const avifPath = variantPath(file, width, 'avif');

      await resized.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);
      await resized.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(avifPath);
      webpEntries.push({ file: webpPath, width });
      avifEntries.push({ file: avifPath, width });

      // JPEG fallbacks are small enough to ship a mobile srcset. PNG stays
      // lossless, so only keep the optimized original as the <img> src.
      if (format === 'jpeg') {
        const fbPath = variantPath(file, width, fallback);
        await encodeOriginal(resized.clone()).toFile(fbPath);
        fallbackEntries.push({ file: fbPath, width });
      }
    }

    if (format === 'png') {
      fallbackEntries.push({ file, width: outWidth });
    }

    await base.clone().webp({ quality: WEBP_QUALITY }).toFile(modernSibling(file, 'webp'));
    await base.clone().avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(modernSibling(file, 'avif'));

    records.push({
      src: file,
      width: outWidth,
      height: outHeight,
      fallback: fallbackEntries,
      webp: webpEntries,
      avif: avifEntries,
    });

    console.log(`variants ${rel}  [${widths.join(', ')}]`);
  }

  writeGenerated(records);
  console.log(`Wrote ${path.relative(ROOT, GENERATED)} (${records.length} images).`);
}

function toImportPath(abs) {
  const rel = path.relative(IMG_ROOT, abs).split(path.sep).join('/');
  return `./${rel}`;
}

function ident(prefix, index, suffix) {
  return `${prefix}${index}${suffix}`;
}

function writeGenerated(records) {
  const lines = [
    '/* eslint-disable */',
    '// Generated by scripts/optimize-images.js — do not edit by hand.',
    '',
    "import { registerResponsiveImages } from '../../utils/responsiveImage';",
    "import type { ResponsiveImageRecord } from '../../utils/responsiveImage';",
    '',
  ];

  records.forEach((record, index) => {
    lines.push(`import ${ident('s', index, '')} from '${toImportPath(record.src)}';`);
    record.fallback.forEach((entry, i) => {
      lines.push(`import ${ident('s', index, `f${i}`)} from '${toImportPath(entry.file)}';`);
    });
    record.webp.forEach((entry, i) => {
      lines.push(`import ${ident('s', index, `w${i}`)} from '${toImportPath(entry.file)}';`);
    });
    record.avif.forEach((entry, i) => {
      lines.push(`import ${ident('s', index, `a${i}`)} from '${toImportPath(entry.file)}';`);
    });
    lines.push('');
  });

  lines.push('const records: ResponsiveImageRecord[] = [');
  records.forEach((record, index) => {
    const fallbackSrcSet = record.fallback
      .map((entry, i) => `\${${ident('s', index, `f${i}`)}} ${entry.width}w`)
      .join(', ');
    const webpSrcSet = record.webp
      .map((entry, i) => `\${${ident('s', index, `w${i}`)}} ${entry.width}w`)
      .join(', ');
    const avifSrcSet = record.avif
      .map((entry, i) => `\${${ident('s', index, `a${i}`)}} ${entry.width}w`)
      .join(', ');

    lines.push('  {');
    lines.push(`    src: ${ident('s', index, '')},`);
    lines.push(`    width: ${record.width},`);
    lines.push(`    height: ${record.height},`);
    lines.push(`    fallbackSrcSet: \`${fallbackSrcSet}\`,`);
    lines.push(`    webpSrcSet: \`${webpSrcSet}\`,`);
    lines.push(`    avifSrcSet: \`${avifSrcSet}\`,`);
    lines.push('  },');
  });
  lines.push('];');
  lines.push('');
  lines.push('registerResponsiveImages(records);');
  lines.push('');
  lines.push('export const responsiveImageRecords = records;');
  lines.push('');

  fs.writeFileSync(GENERATED, lines.join('\n'));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
