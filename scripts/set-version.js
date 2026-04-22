const fs = require('fs');
const path = require('path');

const pkg = require('../package.json');

const targetFile = path.join(__dirname, '../src/environments/version.ts');

const content = `export const APP_VERSION = 'v${pkg.version}';\n`;

fs.writeFileSync(targetFile, content);

console.log(`✅ Version set to v${pkg.version}`);