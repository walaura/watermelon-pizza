module.exports = ctx => ({
	map: ctx.options.map ? ctx.options.map : false,
	plugins: [
		require('postcss-import')({
			root: './css',
		}),
		require('postcss-nesting'),
		require('postcss-clean'),
	],
});
