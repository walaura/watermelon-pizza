const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const template = require('./site-gen/template.js');
const config = require('./../.watermelonrc');

const targetPath = config.files.out;

const doc = yaml.safeLoad(
	fs.readFileSync(path.resolve(__dirname, '..', 'portfolio.yaml'), 'utf8')
);

const html = template(Object.keys(doc).map(id => ({ id, ...doc[id] })));

fs.writeFileSync(path.resolve(targetPath, 'index.html'), html);
