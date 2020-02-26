// =========================================================================

/*
  Build process API

  # To build resources to view the demo file, perform the following tasks
    1. $ gulp build
    2. $ npm run build
    3. $ polymer serve
    4. Go to http://127.0.0.1:8081

  # To work within the development environment, run the following tasks
    1. $ gulp dev
    2. $ npm run dev
    3. $ polymer serve
    4. Go to http://127.0.0.1:8081
*/

// =========================================================================

const gulp = require('gulp'),
  gulpSass = require('gulp-sass'),
  gulpautoprefixer = require('gulp-autoprefixer'),
  postcssCustomProperties = require('postcss-custom-properties'),
  postcss = require('gulp-postcss'),
  removeRules = require('postcss-remove-rules'),
  StyleDictionary = require('style-dictionary');

// task to build CSS/Sass resources from Token JSON files
gulp.task('buildTokens', function(cb) {
  StyleDictionary.extend('./scripts/tokenScript.js');
  cb();
});

// produce CSS Tokens using :host versus :root
gulp.task('distTokens', function(cb) {
  StyleDictionary.extend('./scripts/tokenScriptCustom.js');
  cb();
});

// task to address Sass processing for the demo view
gulp.task('processDemo', function() {
  // set path to where Sass files are located to be processed
  return (
    gulp
      .src('./demo/sass/{,*/}*.{scss,sass}')

      // Sass pipeline
      .pipe(
        gulpSass({
          errLogToConsole: true,
          outputStyle: 'expanded', //alt options: nested, compact, compressed
        })
      )

      // Output final CSS in destination
      .pipe(gulp.dest('./demo/css/'))
  );
});

// task for Production Sass processing and legacy support
gulp.task('processSrc', function() {
  // set path to where Sass files are located to be processed
  return (
    gulp
      .src('./src/*.scss')

      // Sass pipeline
      .pipe(
        gulpSass({
          errLogToConsole: true,
          outputStyle: 'compressed', //alt options: nested, compact, compressed, expanded
        })
      )

      // Post Sass to CSS process for addressing proprietary prefixes
      .pipe(gulpautoprefixer({ overrideBrowserslist: ['last 4 versions'], cascade: false }))

      // PostCss polyfill pipeline for CSS Custom Properties (CSS variables)
      .pipe(
        postcss([
          // Boolean flag determines if CSS Custom Property code is in final output
          // or only outputs legacy supported version CSS
          postcssCustomProperties({
            preserve: true,
          }),

          removeRules({
            rulesToRemove: {
              ':root': '*'
            }
          })
        ])
      )

      // Output final CSS in destination
      .pipe(gulp.dest('./src/'))
  );
});

// task for Development Sass processing
gulp.task('processDev', function() {
  // set path to where Sass files are located to be processed
  return (
    gulp
      .src('./src/*.scss')

      // Sass pipeline
      .pipe(
        gulpSass({
          errLogToConsole: true,
          outputStyle: 'expanded', //alt options: nested, compact, compressed
        })
      )

      // PostCss polyfill pipeline for CSS Custom Properties (CSS variables)
      .pipe(
        postcss([
          removeRules({
            rulesToRemove: {
              ':root': '*'
            }
          })
        ])
      )

      // Output final CSS in destination
      .pipe(gulp.dest('./src/'))
  );
});

// Sass watcher
gulp.task('sassWatch', function() {
  gulp.watch(
    './**/*.{scss,sass}',
    gulp.series(gulp.parallel('processDemo', 'processDev'))
  );
});

// Task(s)
// Gulp Sequence is used to force Gulp to address tasks in specific build order
gulp.task(
  'build',
  gulp.series(
    gulp.parallel('buildTokens', 'processDemo', 'processSrc')
  )
);

gulp.task(
  'dev',
  gulp.series(
    gulp.parallel('buildTokens', 'processDemo', 'processDev','sassWatch')
  )
);
