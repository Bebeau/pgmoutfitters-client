import fs from 'fs';
import path from 'path';

const { assertProductionAssets } = require('../scripts/assertProductionAssets');

const buildDir = path.join(__dirname, '../build');
const describeBuilt = fs.existsSync(path.join(buildDir, 'index.html')) ? describe : describe.skip;

describeBuilt('production build assets', () => {
  test('does not serve source maps and splits non-home JS/CSS', () => {
    expect(() => assertProductionAssets(buildDir)).not.toThrow();
  });
});
