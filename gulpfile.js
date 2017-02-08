var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
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

gulp.task('jade', function(){
  gulp.src('./src/jade/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty:true
    }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('css', function() {
    gulp.src('./src/sass/**/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('./public/css/'))
      .pipe(browserSync.stream());
});

gulp.task('js', function() {
   return gulp.src('./src/js/**/*.js')
      .pipe(plumber())
      .pipe(concat('site.js'))
      .pipe(gulp.dest('./public/js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/js'));
});

gulp.task('htmlhint', function() {
  return gulp.src('./public/**/*.html')
   .pipe(plumber())
   .pipe(htmlhint());
});

gulp.task('default', ['serve'], function() {
  //gulp.watch('./src/jade/**/*.jade', ['jade']);
  //gulp.watch('./src/js/**/*.js', ['js'])
  //gulp.watch('./public/**/*.html', ['htmlhint']);
});
