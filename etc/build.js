const path = require('path');
const fs = require('fs-extra');
const extract = require('extract-zip');
const config = require('./../.watermelonrc');

const sourcePath = config.files.static;
const targetPath = config.files.out;

const run = async () => {
	fs.copySync(sourcePath, targetPath);
};

run().then(() => console.log('unpacked'));
