const path = require('path');
const fs = require('fs-extra');
const extract = require('extract-zip');
const config = require('./../.watermelonrc');

const sourcePath = path.resolve(__dirname, '..', 'etc', 'old');
const targetPath = path.resolve(config.files.out, 'old');

const extractPromise = file =>
	new Promise((yay, nay) => {
		extract(
			path.resolve(sourcePath, file),
			{
				dir: targetPath,
			},
			function(err) {
				if (err) nay(err);
				yay(file);
			}
		);
	});

const run = async () => {
	try {
		fs.removeSync(targetPath);
	} catch (e) {}
	fs.mkdirsSync(targetPath);

	const files = fs
		.readdirSync(sourcePath)
		.filter(file => path.extname(file) === '.zip');

	Promise.all(files.map(extractPromise));
};

run().then(() => console.log('unpacked'));
