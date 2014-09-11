'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var jshint = require('gulp-jshint');
var lazypipe = require('lazypipe');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var notify = require("gulp-notify");

// Utils
// =======================================

function handleErrors(){
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}


// Tasks
// =======================================

gulp.task('browserify', function() {
  return browserify('./app/javascripts/main.js')
    .bundle()
    .on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('jshint', function() {
  return gulp.src([
      './app/javascripts/main.js',
      './app/javascripts/**/*.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(sass({
      compass: true,
      bundleExec: true,
      sourcemap: true,
      sourcemapPath: '../scss'
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('htdocs', function() {
  return gulp.src('app/htdocs/**')
    .on('error', handleErrors)
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['jshint', 'htdocs', 'sass', 'browserify']);
gulp.task('default', ['build']);
