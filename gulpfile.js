var gulp = require('gulp'),
  // concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  spritesmith = require('gulp.spritesmith'),
  // concatcss = require('gulp-concat-css'),
  mincss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  watch = require('gulp-watch'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('src/css/'))
    .pipe(reload({
      stream: true
    }));
});

// gulp.task('ie', function() {
//   return gulp.src('src/sass/ie.scss')
//     .pipe(sass({
//       outputStyle: 'expanded'
//     }).on('error', sass.logError))
//     .pipe(gulp.dest('src/css/'))
//     .pipe(reload({
//       stream: true
//     }));
// });

gulp.task('processingcss', function() {
  return gulp.src('src/css/*.css')
    // .pipe(concatcss('main.min.css'))
    .pipe(mincss())
    .pipe(gulp.dest('built/css'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('sprite', function() {
  var spriteAll =
    gulp.src('src/img/sprites/*.+(png|jpg)') // путь, откуда берем картинки для спрайта
    .pipe(spritesmith({
      imgName: 'spriteall.png',
      cssName: 'spriteall.scss',
      imgPath: '../img/spriteall.png',
    }));

  spriteAll.img.pipe(gulp.dest('src/img')); // путь, куда сохраняем картинку
  spriteAll.css.pipe(gulp.dest('src/sass')); // путь, куда сохраняем стили
  spriteAll.pipe(reload({
    stream: true
  }));
});

gulp.task('imagemin', function() {
  gulp.src('src/img/*.+(png|jpg)')
    .pipe(imagemin())
    .pipe(gulp.dest('built/img'));
});
gulp.task('processingjs', function() {
  return gulp.src('src/js/*.js')
    // .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('built/js'))
    .pipe(reload({
      stream: true
    }));
});




gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
  });
});


gulp.task('watch', ['sass', 'processingcss', 'processingjs', 'sprite', 'imagemin'], function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  // gulp.watch('src/sass/*.scss', ['ie']);
  gulp.watch('src/css/*css', ['processingcss']);
  gulp.watch('src/img/sprites/*.+(png|jpg)', ['sprite']);
  gulp.watch('src/js/*.js', ['processingjs']);
  gulp.watch('src/img/*.+(png|jpg)', ['imagemin']);
  gulp.watch('./*html', reload);

});

gulp.task('default', ['watch']);
