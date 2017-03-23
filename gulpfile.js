var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var htmlhint = require('gulp-htmlhint');

gulp.task('serve', ['css'], function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    
    gulp.watch('./src/sass/**/*.scss', ['css']);
    gulp.watch(['./public/**/*.html', './public/**/*.js']).on('change', browserSync.reload);
});

gulp.task('css', function() {
    gulp.src('./src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./public/css/'))
      .pipe(browserSync.stream());
});

gulp.task('htmlhint', function() {
  return gulp.src('./public/**/*.html')
   .pipe(plumber())
   .pipe(htmlhint())
   .pipe(htmlhint.reporter());

});

gulp.task('default', ['serve'], function() {
  // htmlhint does not work well since pug depricated pretty-print. All html is printed for each error.
  // gulp.watch('./public/**/*.html', ['htmlhint']);
});
