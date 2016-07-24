var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
 
gulp.task('pack-js', function () {  
  return gulp.src(['assets/js/*.js'])
    .pipe(uglify({}))
    .pipe(gulp.dest('public/build/js'));
});
 
gulp.task('pack-css', function () { 
  return gulp.src(['assets/css/*.css'])
    .pipe(minifycss({keppSpecialComments:0}))
   .pipe(gulp.dest('public/build/css'));
});
 
gulp.task('optimize-images', function() {
  return gulp.src(['assets/img/*.{jpg,jpeg,png}'])
    .pipe(imagemin({
      optimizationLevel: 3,
      progessive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('public/build/img'));
});


gulp.task('pack-html', function() {
  return gulp.src(['assets/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('public/build/'));
});

gulp.task('watch', function() {
   gulp.watch('assets/js/*.js', ['pack-js']);
   gulp.watch('assets/css/*.css', ['pack-css']);
   gulp.watch('*.html', ['pack-html']);
   gulp.watch('assets/img/*.{jpg,png}', ['optimize-images']);
});

gulp.task('default',['pack-js','pack-css','pack-html','optimize-images']);
