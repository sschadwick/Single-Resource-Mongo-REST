'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var webPackServer = require('webpack-dev-server');

var filesToWatch = ['server.js', 'routes/*.js', 'models/*.js', 'lib/*.js', 'test/**/*.js', 'gulpfile.js', 'app/**/*.js'];
var appFiles = ['app/**/*.html', 'app/**/*.js']; //dont want to jshint html files

gulp.task('jshint', function() {
  return gulp.src(filesToWatch)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(gulpMocha({reporter: 'nyan'}));
}); 

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
  .pipe(gulp.dest('build/'));
});

gulp.task('staticFiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack-dev-server:dev', function() {
  var config = webpack({});

  new webPackServer(config).listen(8080, 'localhost', function(err) {
    if (err) throw err;
  });
});

gulp.task('serve:dev', function() {
  return gulp.watch(appFiles, ['webpack:dev', 'staticFiles:dev', 'webpack-dev-server:dev']);
});

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
});

gulp.task('build:dev', ['staticFiles:dev', 'webpack:dev']);

gulp.task('default', ['build:dev', 'jshint', 'test']);
