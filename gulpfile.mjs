import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import include from 'gulp-include';
import rename from 'gulp-rename';
import sass from 'gulp-sass';

const BUILD_DIRECTORY = './dist';

const SOURCE_DIRECTORY = './client';

const SOURCE = {
  HTML: SOURCE_DIRECTORY + '/**/*.html',
  SCSS: SOURCE_DIRECTORY + '/**/*.scss'
};

const TASKS = {
  BUILD_DEV: 'build:dev',
  BUILD_PROD: 'build:prod',
  HTML: 'HTML',
  HTML_OPTIMIZED: 'HTML_OPTIMIZED',
  SCSS: 'SCSS',
  WATCH_DEV: 'watch:dev',
  WATCH_PROD: 'watch:prod'
};

gulp.task(TASKS.HTML, () => gulp.src(SOURCE.HTML)
    .pipe(include())
    .on('error', console.error)
    .pipe(gulp.dest(BUILD_DIRECTORY))
);

gulp.task(TASKS.HTML_OPTIMIZED, () => gulp.src(SOURCE.HTML)
    .pipe(include())
    .on('error', console.error)
    .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true
    }))
    .pipe(gulp.dest(BUILD_DIRECTORY))
);

gulp.task(
  TASKS.SCSS,
  () => gulp
    .src(SOURCE.SCSS)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(BUILD_DIRECTORY))
);

gulp.task(TASKS.BUILD_DEV, gulp.series([
  TASKS.HTML,
  TASKS.SCSS
]));

gulp.task(TASKS.BUILD_PROD, gulp.series([
  TASKS.HTML_OPTIMIZED,
  TASKS.SCSS
]));

gulp.task(TASKS.WATCH_DEV, () => {
  gulp.watch(SOURCE.HTML, gulp.series([TASKS.HTML]));
  gulp.watch(SOURCE.SCSS, gulp.series([TASKS.SCSS]));
});

gulp.task(TASKS.WATCH_PROD, () => {
  gulp.watch(SOURCE.HTML, gulp.series([TASKS.HTML_OPTIMIZED]));
  gulp.watch(SOURCE.SCSS, gulp.series([TASKS.SCSS]));
});