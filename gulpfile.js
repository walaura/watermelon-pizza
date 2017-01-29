const gulp = require('gulp');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const path = require('path');
const fs = require('fs-extra');


var webpackConfig = {
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	output: {
		filename: 'watermelon.js',
	},
	resolve: {
		root: path.resolve('./js')
	}
};


gulp.task('clean',function() {
	['public/watermelon','public/old'].map((dir) => fs.removeSync(dir))
	fs.mkdirsSync('public/watermelon');
	fs.copySync('etc/old','public/old');
});


gulp.task('makejs', function() {
	return gulp.src('js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(uglify())
		.pipe(gulp.dest('public/watermelon/'));
});


gulp.task('watch',function() {
	webpackConfig.devtool = 'source-map';
	webpackConfig.watch = true;
	return gulp.src('js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('public/watermelon/'));
})


gulp.task('make',['clean'],function(){
	gulp.start('makejs');
})
