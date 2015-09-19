'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var webPackServer = require('webpack-dev-server');
var Karma = require('karma').Server;

var filesToWatch = ['server.js', 'routes/*.js', 'models/*.js', 'lib/*.js', 'test/**/*.js', 'gulpfile.js', 'app/**/*.js'];
var appFiles = ['app/**/*.html', 'app/**/*.js']; //dont want to jshint html files

gulp.task('jshint', function() {
  return gulp.src(filesToWatch)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
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

gulp.task('webpack:test', function() {
  return gulp.src('./test/client/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/client'));
});

gulp.task('staticFiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('servertests', function() {
  return gulp.src('./test/api_test/**/*test.js')
    .pipe(mocha({reporter: 'nyan'}))
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      if (this.seq.length === 1 && this.seq[0] === 'servertests')
        process.exit();
    }.bind(this));
});

gulp.task('karmatests', ['webpack:test'], function(done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function() {
  return gulp.watch(filesToWatch, ['default']);
});

gulp.task('build:dev', ['staticFiles:dev', 'webpack:dev']);

//TODO add jshint, servertest tasks, build:dev.
gulp.task('default', ['karmatests']);
