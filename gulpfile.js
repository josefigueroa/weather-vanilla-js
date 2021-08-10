// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Use dart-sass for @use
//sass.compiler = require('dart-sass');
const config = {
	fontsDir: 'dist/fonts/poppins/',
	jsDir: 'dist/js/',
	cssDir: 'dist/css/',
	htmlDir: 'dist/',

}
function fontTask(){
	return src('./node_modules/typeface-poppins/files/*.{woff, woff2}')
		.pipe(dest(config.fontsDir));
}

function htmlTask(){
	return src('*.html')
		.pipe(dest(config.htmlDir));
}

// Sass Task
function scssTask() {
	return src('app/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(dest(config.cssDir, { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
	return src('app/js/*.js', { sourcemaps: true })
		.pipe(babel())
		.pipe(terser())
		.pipe(dest(config.jsDir, { sourcemaps: '.' }));
}

// Browsersync
function browserSyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: '.',
			index: 'index.html'
		},
		notify: {
			styles: {
				top: 'auto',
				bottom: '0',
			},
		},
	});
	cb();
}
function browserSyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browserSyncReload);
	watch(
		['app/scss/**/*.scss', 'app/**/*.js'],
		series(htmlTask, fontTask, scssTask, jsTask, browserSyncReload)
	);
}

// Default Gulp Task
exports.default = series(htmlTask, fontTask, scssTask, jsTask, browserSyncServe, watchTask);
