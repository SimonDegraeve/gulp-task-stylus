'use strict';

var gulp = require('gulp');

require('gulp-task-update')();
require('gulp-task-lint')('./lib/**/*.js', {shouldFail: true});

gulp.task('test', ['lint']);
