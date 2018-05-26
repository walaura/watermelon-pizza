const path = require('path');
const config = require('./.watermelonrc');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},

	entry: 'app',

	resolve: {
		modules: [path.resolve('./js'), path.resolve('./node_modules')],
	},

	output: {
		filename: 'watermelon.js',
		path: config.files.out,
	},

	mode: 'production',
};
