const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
const tsconfig = require('./tsconfig.json');
const tsProject = ts.createProject('./tsconfig.json');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

const SASS_FILES = './src/sass/**/*.scss';

gulp.task('sass', function() {
  return gulp.src(SASS_FILES)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 3 versions', 'ie 8', 'ie 9'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./deploy/styles'))
    .pipe(browserSync.stream());
});

gulp.task('ts', function() {
  browserify()
    .add('./src/ts/boot.ts')
    .plugin(tsify)
    .transform("babelify", {presets: ["es2015"], extensions : [".js",".ts"]})
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(source('build.js'))
    .pipe(gulp.dest('./deploy/js'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./deploy'));
});

gulp.task('tslint', function() {
  gulp.src('./src/ts/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('fonts', function() {
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./deploy/fonts'))
});

gulp.task('serve', ['ts', 'sass', 'html', 'fonts'], function() {
    browserSync.init({
        server: {
          index: './deploy/index.html',
          baseDir: ["./deploy", "./"]
        },
        port: 3003,
        https: true
    });

    gulp.watch('src/ts/**/*.ts', ['ts']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('./index.html', ['html']);
});