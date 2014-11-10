'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');
var pleeease = require('gulp-pleeease');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');
var livereload = require('gulp-livereload');
var koutoSwiss = require('kouto-swiss');
var join = require('path').join;
var extend = require('util')._extend;

module.exports = function(src, dest, options) {
  options = extend({
    taskName: 'stylus',
    liveReloadServer: null,
    shouldMinify: false
  }, options || {});

  gulp.task(options.taskName, function() {
    return gulp.src(src)
      .pipe(cache(options.taskName))
      .pipe(progeny())
      .pipe(stylus({
        use: [koutoSwiss()],
        sourcemap: {
          inline: true
        }
      }))
      .pipe(pleeease({
        minifier: false
      }))
      .pipe(gulpif(options.shouldMinify, csso()))
      .pipe(gulp.dest(dest));
  });

  gulp.task('watch:' + options.taskName, [options.taskName], function() {
    if (options.liveReloadServer !== false) {
      if (typeof options.liveReloadServer !== 'function') {
        options.liveReloadServer = livereload;
        options.liveReloadServer.listen();
      }
      gulp.watch(join(dest, '**')).on('change', options.liveReloadServer.changed);
    }
    gulp.watch(src, [options.taskName]);
  });
};
