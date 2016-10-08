/**
 * gulp base tasks
 *
 * origin Google Web Starter Kit.
 * https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js
 */

'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import config from './gulpconfig';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Concatenate and minify JavaScript.
// Optionally transpiles ES2015 code to ES5.
gulp.task('scripts', () =>
  gulp.src([
    config.globs.scripts
  ])
    .pipe($.plumber())
    .pipe($.if(config.outputSourcemaps, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.concat('app.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.if(config.outputSourcemaps, $.sourcemaps.write('.')))
    .pipe(gulp.dest(config.dest.scripts))
);

// Watch files for changes & reload
gulp.task('serve', ['scripts'], () => {
  browserSync({
    // add project settings
    nofify: false,
    server: 'app'
  });

  gulp.watch([config.globs.scripts], ['scripts', reload]);
});
