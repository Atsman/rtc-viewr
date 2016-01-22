const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsProject = ts.createProject('./tsconfig.json');
const browserSync = require('browser-sync').create();

gulp.task('ts', function() {
  tsProject.src(['./src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./deploy'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./deploy'));
});

gulp.task('tslint', function() {
  gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
          index: './deploy/index.html',
          baseDir: ["./deploy", "./"]
        }
    });
});