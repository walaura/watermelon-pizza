const path = require('path');
const fs = require('fs');
const rmdir = require('rmdir');
const extract = require('extract-zip');

const sourcePath = path.resolve(__dirname, '..', 'etc', 'old');
const targetPath = path.resolve(__dirname, '..', 'public', 'old');

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
	await new Promise(yay => rmdir(targetPath, {}, () => yay()));
	fs.mkdirSync(targetPath);

	const files = fs
		.readdirSync(sourcePath)
		.filter(file => path.extname(file) === '.zip');

	Promise.all(files.map(extractPromise));
};

run().then(() => console.log('unpacked'));
