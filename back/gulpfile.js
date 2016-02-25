'use strict';

// Import libraries
const Gulp = require('gulp');

// Require all gulp scripts
require('require-dir')('./gulp');

// Define default task
Gulp.task('default', ['serve:api-application']);
