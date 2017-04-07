'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');


gulp.task('default', function (cb) {
	runSequence('sass-build', ['nodemon'] , cb);
});


gulp.task('sass-build', function () {
  return gulp.src('./public/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles/css'));
});

// gulp.task('browser-sync', ['nodemon'],  function() {
// 	browserSync.init(null, {
// 		proxy: "http://localhost:7400",
//         // files: ["public/**/*.*"],
//         port: 7600,
//         open: false,

//   //       server: {
// 		// 	baseDir: ["./","public/**/*.*" ]

// 		// },
// 		// server: ['.tmp', 'app'],
// 		// server: ['index.html'],
// 		// server: {
// 		// 	baseDir: "./"
// 		// },
// 		// notify: false,
// 		// open: false,
// 		// port:7500,
// 		// logPrefix: 'node_mongodb'
// 	});
// });
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


