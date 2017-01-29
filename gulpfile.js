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
const extract = require('extract-zip')

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

});


gulp.task('makearchive',function(done){
	fs.removeSync('public/old');
	fs.mkdirsSync('public/old');
	fs.readdir('etc/old',function(err,files){

		if(err) throw err;
		files = files.filter((file)=> path.extname(file) === '.zip');

		let extractedFiles = 0;
		let onExtractionComplete = () => {
			extractedFiles++;
			if(extractedFiles >= files.length) done();
		}

		files.map((file)=>{
			let extraction = extract('./etc/old/'+file,{
				dir: process.cwd()+'/public/old'
			},function(err){
				if(err) throw err;
				onExtractionComplete();
			});
		});

	})
})


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

	gulp.start('makearchive','makejs','makecss');

})
