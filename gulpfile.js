var gulp = require('gulp');
var watch = require('gulp-watch');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var scss = require('gulp-scss');

function version(){
 var now = new Date(),
   Y = now.getFullYear(),
   //Compile all JS tasks
gulp.task('build-js', [
  'build-main-js',
  'build-auth-js',
  'build-users-js'
]);
   m = now.getMonth()+1,
   d = now.getDate(),
   H = now.getHours(),
   i = now.getMinutes(),
   s = now.getSeconds();

   if(H < 10) {
       H = '0' + H;
   }

   if(i < 10) {
       i = '0' + i;
   }

   if(s < 10) {
       s = '0' + s;
   }

   return String(10000*Y + 100*m + d + '.' + H + i + s);
}

gulp.task('default', ['watch']);

gulp.task('build-css', function(){
 //Create an unminified version
 var full = gulp.src([
   'src/scss/main.scss'
 ])
 . pipe(scss())
 . pipe(concat('main.css'))
 gulp.task('build-users-js', function() {

  var userApp = gulp.src([
    'src/js/users.app.js',
  ])
  .pipe(concat('users.app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist/js'));

  return merge(userApp);
});
 . pipe(gulp.dest('dist/css'));

 //Create a minified version
 var min = gulp.src([
   'src/scss/main.scss'
 ])
 . pipe(scss())
 . pipe(cleanCSS())
 . pipe(concat('main.min.' + version() + '.css'))
 . pipe(gulp.dest('dist/css'));

 return merge(full, min);
});


gulp.task('build-js', function() {
 var full = gulp.src([
   'src/js/main.js'
 ])
 .pipe(concat('main.js'))
 .pipe(gulp.dest('dist/js'));

 var min = gulp.src([
   'src/js/main.js'
 ])
 .pipe(concat('main.min.' + version() + '.js'))
 .pipe(uglify())
 .pipe(gulp.dest('dist/js'));

 return merge(full, min);
});

gulp.task('watch', function(){
 gulp.watch('./src/scss/**/*.scss', ['build-css']);
 gulp.watch('./src/js/**/*.js', ['build-js']);
});