'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');
var watch = require('gulp-watch');

var filesToWatch = ['server.js', 'routes/*.js', 'models/*.js', 'lib/*.js', 'test/**/*.js', 'gulpfile.js'];

gulp.task('jshint', function() {
  return gulp.src(filesToWatch)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(gulpMocha({reporter: 'nyan'}));
}); 

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
});

gulp.task('default', ['jshint', 'test']);
