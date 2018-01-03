var gulp    = require('gulp');
var less    = require('gulp-less');
var sass    = require('gulp-sass');
var rename  = require('gulp-rename');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');

gulp.task('watch', function() {
    gulp.watch('src/**', ['build:style']);
});

gulp.task('build:style', function() {
  gulp
    .src(['src/**/index.scss'], { base: 'src' })
    .pipe(sass().on('error',sass.logError))
    .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
    .pipe(
        cssnano({
            zindex: false,
            autoprefixer: false,
            discardComments: { removeAll: true }
        })
    )
    .pipe(
        rename(function(path) {
            path.extname = '.css';
        })
    )
    .pipe(gulp.dest('dist'));
});


gulp.task('build:example', function() {
  gulp
    .src(
        [
            'src/**/*',
            '!src/**/*.less',
        ],
        { base: 'src' }
    )
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch', 'build:style']);
