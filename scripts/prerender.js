const fs = require('fs');
const http = require('http');
const path = require('path');
const { URL } = require('url');
const { getPrerenderPaths } = require('../src/utils/prerenderRoutes');
const { assertDistinctPageTitles, assertPrerenderedPage, getTitle } = require('./assertPrerenderedHtml');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const HOST = '127.0.0.1';
const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
};

const chromeCandidates = () =>
  [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    '/usr/local/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
  ].filter((candidate) => candidate && fs.existsSync(candidate));

const destForRoute = (route) => {
  if (route === '/') {
    return path.join(BUILD_DIR, 'index.html');
  }
  return path.join(BUILD_DIR, route.replace(/^\//, ''), 'index.html');
};

const createSpaServer = (spaIndexHtml, port) =>
  http.createServer((req, res) => {
    const parsed = new URL(req.url || '/', `http://${HOST}:${port}`);
    const urlPath = decodeURIComponent(parsed.pathname);
    if (urlPath.includes('\0') || urlPath.split('/').includes('..')) {
      res.writeHead(400);
      res.end();
      return;
    }

    const filePath = path.normalize(path.join(BUILD_DIR, urlPath));
    if (!filePath.startsWith(BUILD_DIR)) {
      res.writeHead(400);
      res.end();
      return;
    }

    const ext = path.extname(urlPath).toLowerCase();
    if (ext && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // Always serve the original CRA shell so we snapshot the client render,
    // not a file written earlier in this run. nginx try_files $uri $uri/ /index.html
    // will prefer the folder index after copy-to-html.
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(spaIndexHtml);
  });

const shouldAbort = (url) =>
  /googletagmanager\.com|google-analytics\.com|googleadservices\.com|doubleclick\.net|use\.typekit\.net|fonts\.googleapis\.com|maps\.googleapis\.com|maps\.google\.com|google\.com\/maps|maps\.gstatic\.com/i.test(
    url
  );

const waitForPrerenderReady = async (page, route) => {
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      const title = document.title || '';
      const canonical = document.querySelector('link[rel="canonical"]');
      const description = document.querySelector('meta[name="description"]');
      const main = document.querySelector('.homeHeading h1, #productPage h2, .dealerPage h1');
      return Boolean(
        root &&
          root.innerHTML.trim() &&
          title.includes('PGM Outfitters') &&
          canonical &&
          description &&
          main &&
          !document.querySelector('.loader')
      );
    },
    { timeout: 45000 }
  );

  const snapshot = await page.evaluate(() => ({
    title: document.title,
    rootLength: (document.getElementById('root') || {}).innerHTML.length || 0,
  }));

  if (!snapshot.title || snapshot.rootLength < 50) {
    throw new Error(`Prerender of ${route} produced empty title or #root`);
  }
};

const prerenderRoute = async (browser, origin, route) => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (shouldAbort(request.url())) {
      return request.abort();
    }
    return request.continue();
  });

  await page.goto(`${origin}${route}`, { waitUntil: 'load', timeout: 60000 });
  await waitForPrerenderReady(page, route);
  const html = await page.content();
  await page.close();
  return html;
};

const smokeCheckBuiltFiles = () => {
  const home = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const feeder = fs.readFileSync(path.join(BUILD_DIR, 'deer-feeders', '5-n-1', 'index.html'), 'utf8');
  const dealer = fs.readFileSync(path.join(BUILD_DIR, 'dealers', 'delta-outdoors', 'index.html'), 'utf8');

  assertPrerenderedPage(home, {
    title: 'Next Generation Deer Feeders | PGM Outfitters',
    description:
      'Shreveport-made deer feeders that run protein and corn on gravity or timer. Built by PGM Outfitters for hunters and dealers.',
    canonical: 'https://pgmoutfitters.com/',
    contentIncludes: ['Next Generation Deer Feeders'],
  });
  assertPrerenderedPage(feeder, {
    title: '5-N-1 Deer Feeder | PGM Outfitters',
    description:
      'The 5-N-1 deer feeder from PGM Outfitters. Built for hunters and dealers. Request pricing.',
    canonical: 'https://pgmoutfitters.com/deer-feeders/5-n-1',
    contentIncludes: ['5-N-1'],
  });
  assertPrerenderedPage(dealer, {
    title: 'Delta Outdoors | PGM Outfitters Dealer',
    description:
      'Shop Next Generation deer feeders at Delta Outdoors in Cleveland, MS. Address, directions, and the full PGM Outfitters lineup.',
    canonical: 'https://pgmoutfitters.com/dealers/delta-outdoors',
    contentIncludes: ['Delta Outdoors'],
  });

  assertDistinctPageTitles([{ html: home }, { html: feeder }, { html: dealer }]);
  if (getTitle(feeder) === getTitle(home) || getTitle(dealer) === getTitle(home)) {
    throw new Error('Feeder or dealer HTML still has the homepage title');
  }
  console.log('Prerender smoke: homepage, 5-n-1, and delta-outdoors have distinct titles.');
};

const main = async () => {
  if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
    throw new Error('build/index.html is missing. Run react-scripts build first.');
  }

  const spaIndexHtml = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8');
  const routes = getPrerenderPaths();
  const server = createSpaServer(spaIndexHtml, 0);

  await new Promise((resolve) => server.listen(0, HOST, resolve));
  const port = server.address().port;
  const origin = `http://${HOST}:${port}`;

  const puppeteer = (await import('puppeteer')).default;
  const executablePath = chromeCandidates()[0];
  const browser = await puppeteer.launch({
    headless: true,
    executablePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    for (const route of routes) {
      const html = await prerenderRoute(browser, origin, route);
      if (!html.includes('PGM Outfitters') || !getTitle(html)) {
        throw new Error(`Prerender of ${route} is missing a page title`);
      }
      const dest = destForRoute(route);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, html);
      console.log(`Wrote ${path.relative(path.join(__dirname, '..'), dest)}`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve, reject) => server.close((err) => (err ? reject(err) : resolve())));
  }

  smokeCheckBuiltFiles();
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  destForRoute,
  getPrerenderPaths,
};
