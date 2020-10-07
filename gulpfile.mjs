import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-include';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

gulp.task('html', () => gulp.src('./client/index.html')
    .pipe(include())
    .on('error', console.error)
    .pipe(gulp.dest('./dist'))
);

gulp.task('html:optimized', () => gulp.src('./client/index.html')
    .pipe(include())
    .on('error', console.error)
    .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true
    }))
    .pipe(gulp.dest('./dist'))
);

gulp.task(
  'sass',
  () => gulp
    .src('./client/scss/base.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('build:dev', gulp.series([
  'html',
  'sass'
]));

gulp.task('build:prod', gulp.series([
  'html:optimized',
  'sass'
]));

gulp.task('watch:dev', () => {
  gulp.watch('./client/**/*.html', gulp.series(['html']));
  gulp.watch('./client/**/*.scss', gulp.series(['sass']));
});

gulp.task('watch:prod', () => {
  gulp.watch('./client/**/*.html', gulp.series(['html:optimized']));
  gulp.watch('./client/**/*.scss', gulp.series(['sass']));
});