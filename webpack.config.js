const path = require('path');

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
		path: path.resolve(__dirname, 'public', 'watermelon'),
	},

	mode: 'production',
};
