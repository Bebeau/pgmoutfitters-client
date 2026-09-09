import fs from 'fs';
import path from 'path';

const CONF_PATH = path.join(__dirname, '../../deploy/nginx-security-headers.conf');

const parseActiveHeaders = (conf: string) => {
  const headers: Record<string, string[]> = {};
  for (const raw of conf.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^add_header\s+(\S+)\s+"([^"]*)"\s+always\s*;$/);
    if (!match) {
      throw new Error(`Unexpected active line in nginx-security-headers.conf: ${line}`);
    }
    const [, name, value] = match;
    headers[name] = headers[name] || [];
    headers[name].push(value);
  }
  return headers;
};

const parseCommentedFullEnforce = (conf: string) => {
  const match = conf.match(
    /^# add_header Content-Security-Policy "([^"]+)" always;$/m
  );
  return match ? match[1] : undefined;
};

const header = (headers: Record<string, string[]>, name: string) => {
  expect(headers[name]).toHaveLength(1);
  return headers[name][0];
};

describe('deploy/nginx-security-headers.conf', () => {
  const conf = fs.readFileSync(CONF_PATH, 'utf8');
  const headers = parseActiveHeaders(conf);

  test('documents Kyle’s live box paths and the nginx add_header gotcha', () => {
    expect(conf).toContain('~/pgmoutfitters.com');
    expect(conf).toContain('sites-available/pgmoutfitters.com');
    expect(conf).toContain('add_header on a location replaces parent add_header');
    expect(conf).toContain('Do not paste this into');
    expect(conf).toContain('api.pgmoutfitters.com');
  });

  test('enforces HSTS for one year with includeSubDomains and no preload', () => {
    expect(header(headers, 'Strict-Transport-Security')).toBe(
      'max-age=31536000; includeSubDomains'
    );
    expect(conf).toMatch(/Do NOT add preload|do not set preload/i);
  });

  test('enforces frame control, COOP, and the other Best Practices headers', () => {
    expect(header(headers, 'X-Frame-Options')).toBe('SAMEORIGIN');
    expect(header(headers, 'Cross-Origin-Opener-Policy')).toBe('same-origin');
    expect(header(headers, 'Cross-Origin-Resource-Policy')).toBe('same-origin');
    expect(header(headers, 'X-Content-Type-Options')).toBe('nosniff');
    expect(header(headers, 'Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(header(headers, 'Permissions-Policy')).toBe(
      'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
    );
    expect(conf).not.toMatch(/^\s*add_header Cross-Origin-Embedder-Policy/m);
  });

  test('enforces a short CSP that cannot break scripts, fonts, maps, or XHR', () => {
    const csp = header(headers, 'Content-Security-Policy');
    expect(csp).toContain("frame-ancestors 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self' https://checkout.stripe.com");
    expect(csp).toContain('upgrade-insecure-requests');
    expect(csp).not.toMatch(/default-src|script-src|style-src|font-src|connect-src|frame-src|img-src/);
    expect(headers['Content-Security-Policy']).toHaveLength(1);
  });

  test('stages a Report-Only allowlist for first-party and required third parties', () => {
    const report = header(headers, 'Content-Security-Policy-Report-Only');
    const required = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      'https://www.googleadservices.com',
      "style-src 'self' 'unsafe-inline' https://use.typekit.net",
      'https://p.typekit.net',
      'https://api.pgmoutfitters.com',
      'https://checkout.stripe.com',
      'https://maps.google.com',
      'https://www.google.com',
      'https://flagcdn.com',
      'https://init-public.s3.amazonaws.com',
    ];
    for (const token of required) {
      expect(report).toContain(token);
    }
    expect(report).toContain("frame-src https://maps.google.com");
    expect(report).toMatch(/connect-src[^;]*https:\/\/api\.pgmoutfitters\.com/);

    const fullEnforce = parseCommentedFullEnforce(conf);
    expect(fullEnforce).toBe(report);
    expect(conf).toContain('rename this header to');
    expect(conf).toContain('Drop flagcdn.com after Inquiry');
    expect(conf).toContain('js.stripe.com');
  });
});
