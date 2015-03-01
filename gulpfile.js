var gulp = require('gulp');
var traceur = require('gulp-traceur');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');

gulp.task('watch', function () {
  'use strict';
  return gulp.watch('./lib/**/*.js', ['traceur']);
});

gulp.task('traceur', function () {
  'use strict';
  return gulp.src('./lib/**/*.js')
    .pipe(traceur())
    .pipe(wrap('(function () {\n<%= contents %>\n}());'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['traceur'], function () {
  'use strict';
  return gulp.src('./dist/immutable.js')
    .pipe(rename('immutable.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});
