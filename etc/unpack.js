const path = require('path');
const fs = require('fs');
const rmdir = require('rmdir');
const extract = require('extract-zip');

const action = async () =>
	new Promise(done => {
		rmdir(path.resolve(__dirname, '..', 'public', 'old'));
		fs.mkdirSync(path.resolve(__dirname, '..', 'public', 'old'));

		fs.readdir(path.resolve(__dirname, 'old'), (err, files) => {
			if (err) throw err;
			files = files.filter(file => path.extname(file) === '.zip');

			let extractedFiles = 0;
			let onExtractionComplete = () => {
				extractedFiles++;
				if (extractedFiles >= files.length) done();
			};

			files.map(file => {
				let extraction = extract(
					'./etc/old/' + file,
					{
						dir: process.cwd() + '/public/old',
					},
					function(err) {
						if (err) throw err;
						onExtractionComplete();
					}
				);
			});
		});
	});

action().then(() => console.log('unpacked'));
