const getTitle = (html) => {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : '';
};

const getMetaContent = (html, name) => {
  const named = html.match(
    new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i')
  );
  if (named) {
    return named[1];
  }
  const contentFirst = html.match(
    new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${name}["'][^>]*>`, 'i')
  );
  return contentFirst ? contentFirst[1] : '';
};

const getCanonical = (html) => {
  const relFirst = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
  if (relFirst) {
    return relFirst[1];
  }
  const hrefFirst = html.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return hrefFirst ? hrefFirst[1] : '';
};

const getRootInnerHtml = (html) => {
  const open = html.match(/<div id="root"[^>]*>/i);
  if (!open) {
    return '';
  }

  const start = open.index + open[0].length;
  const rest = html.slice(start);
  const tagRe = /<\/?div\b[^>]*>/gi;
  let depth = 1;
  let match;
  while ((match = tagRe.exec(rest))) {
    if (match[0].slice(0, 2) === '</') {
      depth -= 1;
      if (depth === 0) {
        return rest.slice(0, match.index);
      }
    } else {
      depth += 1;
    }
  }

  return rest;
};

const assertPrerenderedPage = (html, expected) => {
  const title = getTitle(html);
  if (title !== expected.title) {
    throw new Error(`Expected title "${expected.title}", got "${title}"`);
  }

  const description = getMetaContent(html, 'description');
  if (description !== expected.description) {
    throw new Error(`Expected description "${expected.description}", got "${description}"`);
  }

  const canonical = getCanonical(html);
  if (canonical !== expected.canonical) {
    throw new Error(`Expected canonical "${expected.canonical}", got "${canonical}"`);
  }

  const root = getRootInnerHtml(html);
  if (!root || !root.trim()) {
    throw new Error('Empty #root is a fail');
  }

  expected.contentIncludes.forEach((snippet) => {
    if (!root.includes(snippet)) {
      throw new Error(`Missing visible content in #root: ${snippet}`);
    }
  });
};

const assertDistinctPageTitles = (pages) => {
  const titles = pages.map((page) => getTitle(page.html));
  if (new Set(titles).size !== titles.length) {
    throw new Error(`Prerendered titles are not unique: ${titles.join(' | ')}`);
  }
};

module.exports = {
  getTitle,
  getMetaContent,
  getCanonical,
  getRootInnerHtml,
  assertPrerenderedPage,
  assertDistinctPageTitles,
};
