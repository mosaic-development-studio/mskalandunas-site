import gulp from 'gulp';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

gulp.task(
  'sass',
  () => gulp
    .src('./client/scss/base.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series([
  'sass'
]));