const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');

const walk = (dir, files = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
};

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const assertProductionAssets = (buildDir = BUILD_DIR) => {
  assert(fs.existsSync(path.join(buildDir, 'index.html')), 'build/index.html is missing');

  const files = walk(buildDir);
  const relative = (file) => path.relative(buildDir, file);
  const maps = files.filter((file) => file.endsWith('.map'));
  assert(
    maps.length === 0,
    `Production build must not serve source maps; found:\n${maps.map(relative).join('\n')}`
  );

  const cssJs = files.filter((file) => /\.(css|js)$/.test(file));
  const withMapComment = cssJs.filter((file) =>
    fs.readFileSync(file, 'utf8').includes('sourceMappingURL')
  );
  assert(
    withMapComment.length === 0,
    `Built assets still reference source maps:\n${withMapComment.map(relative).join('\n')}`
  );

  const jsFiles = files.filter((file) => file.includes(`${path.sep}static${path.sep}js${path.sep}`) && file.endsWith('.js'));
  const cssFiles = files.filter((file) => file.includes(`${path.sep}static${path.sep}css${path.sep}`) && file.endsWith('.css'));
  assert(jsFiles.length >= 3, `Expected route-split JS chunks, found ${jsFiles.length}`);
  assert(cssFiles.length >= 2, `Expected critical + route CSS chunks, found ${cssFiles.length}`);

  const typekit = fs.readFileSync(path.join(buildDir, 'typekit-swap.css'), 'utf8');
  assert(typekit.includes('font-display: swap'), 'typekit-swap.css must set font-display: swap');
  assert(!typekit.includes('font-display:auto'), 'typekit-swap.css must not use font-display:auto');
  assert(
    !/@font-face[^}]*font-family:\s*["']stratum-2-web["']/.test(typekit),
    'unused Typekit family stratum-2-web should stay omitted'
  );

  const homeHtml = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
  assert(
    /<link[^>]+rel=["']preload["'][^>]+href=["'][^"']*typekit-swap\.css["']|<link[^>]+href=["'][^"']*typekit-swap\.css["'][^>]+rel=["']preload["']/.test(
      homeHtml
    ),
    'Homepage must preload typekit-swap.css instead of a blocking @import'
  );
  assert(
    !/use\.typekit\.net\/yby0lpp\.css/.test(homeHtml),
    'Homepage must not load the stock Typekit CSS (font-display:auto)'
  );
  assert(/<script[^>]+defer/.test(homeHtml), 'CRA scripts should stay deferred');
  assert(
    !/sourceMappingURL|\.js\.map|\.css\.map/.test(homeHtml),
    'Homepage HTML must not point clients at source maps'
  );

  const homeScripts = [...homeHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map((match) => match[1]);
  const appScripts = homeScripts.filter((src) => src.includes('/static/js/'));
  assert(
    appScripts.length === 1 && /\/static\/js\/main\.[a-f0-9]+\.js$/.test(appScripts[0]),
    `Homepage should only boot main.js; found ${appScripts.join(', ') || 'none'}`
  );
  const homeCss = [...homeHtml.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)].map((match) => match[1]);
  assert(
    homeCss.some((href) => /\/static\/css\/main\.[a-f0-9]+\.css$/.test(href)),
    'Homepage must include the critical CSS chunk'
  );
  assert(
    !homeCss.some((href) => /\/static\/css\/(product|cart|inquiry|legal|dealer)\./.test(href)),
    `Homepage must not load route CSS: ${homeCss.join(', ')}`
  );

  const namedChunks = jsFiles.map((file) => path.basename(file));
  assert(
    namedChunks.some((name) => name.startsWith('product.')),
    `Missing product route chunk among ${namedChunks.join(', ')}`
  );
  assert(
    namedChunks.some((name) => name.startsWith('inquiry.')),
    `Missing inquiry vendor chunk among ${namedChunks.join(', ')}`
  );

  console.log(
    `Production assets: ${jsFiles.length} JS chunks, ${cssFiles.length} CSS chunks, no source maps.`
  );
};

if (require.main === module) {
  try {
    assertProductionAssets();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = { assertProductionAssets };
