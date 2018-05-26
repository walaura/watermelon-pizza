module.exports = ctx => ({
	plugins: [
		require('postcss-import')({
			root: './css',
		}),
		require('postcss-nesting'),
		require('cssnano'),
	],
});
