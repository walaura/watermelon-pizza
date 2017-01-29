const path = require('path');
const fs = require('fs-extra');

const gulp = require('gulp');
const webpack = require('webpack-stream');
const WebpackClearConsole = require("webpack-clear-console").WebpackClearConsole;
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const banner = require('gulp-banner');

const bannerText = fs.readFileSync('./etc/banner.txt').toString()+"\n\n";

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
	plugins: [],
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

	webpackConfig.plugins.push(
		new WebpackClearConsole()
	);

	return gulp.src('js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(uglify())
		.pipe(banner(bannerText))
		.pipe(gulp.dest('public/watermelon/'));

});


gulp.task('makecss',function(){

	return gulp.src('./css/app.scss')
		.pipe(sass({}).on('error', sass.logError))
		.pipe(rename('watermelon.css'))
		.pipe(uglifycss({}))
		.pipe(banner(bannerText))
		.pipe(gulp.dest('public/watermelon'));

});


gulp.task('watch',function() {

	gulp.watch('./css/**/*.scss', ['makecss']);

	webpackConfig.devtool = 'source-map';
	webpackConfig.watch = true;
	return gulp.src('js/app.js')
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('public/watermelon/'));

})


gulp.task('make',['clean'],function(){

	gulp.start('makejs','makecss');

})
