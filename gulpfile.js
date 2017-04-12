'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var del = require('del');
var livereload = require('gulp-livereload');


gulp.task('default', function (cb) {
	runSequence('watch', 'sass-build', ['nodemon'], cb);
	// runSequence('serve', 'sass-build', cb);
});


gulp.task('sass-build', ['clean:styles'], function () {
  return gulp.src('./public/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/dist/styles/css'));
});



gulp.task('clean:styles', function () {
	return del([
		'./public/dist/styles/css/**/*',
		// '!./public/styles/**/*.scss'
	]);
});

gulp.task('watch', function () {



	// browserSync({
	// 	server: {
	// 		baseDir: ["./","public/**/*.*" ]
	// 	},
	// 	notify: false,
	// 	open: false,
	// 	port:7600,
	// 	logPrefix: 'FABRICATOR'
	// });

	gulp.task('sass-build:watch', ['sass-build']);
	gulp.watch('./public/styles/**/*.scss', ['sass-build:watch']);

	// gulp.task('sass:watch', function () {
	// 	console.log('test');
	//   gulp.watch('./public/styles/**/*.scss', ['sass-build']);
	// });

});

// gulp.task('browser-sync', ['nodemon'],  function() {
gulp.task('browser-sync',  function() {

	browserSync.init(null, {
		// proxy: "http://localhost:7400",
		// files: ["public/**/*.*"],
		port: 7600,
		open: false,

		server: {
			baseDir: ["./","public/**/*.*" ]

		},
		// server: ['.tmp', 'app'],
		// server: ['index.html'],
		// server: {
		// 	baseDir: "./"
		// },
		// notify: false,
		// open: false,
		// port:7500,
		// logPrefix: 'node_mongodb'
	});
});
gulp.task('nodemon', function (cb) {
	
	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


