// Settings
const gulp          = require("gulp"),
    minifyCss         = require("gulp-minify-css"),
    uglify            = require('gulp-uglify'),
    sass              = require("gulp-sass"),
    concat            = require('gulp-concat'),
    jsmin             = require('gulp-jsmin'),
    imagemin          = require('gulp-imagemin'),
    pngquant          = require('imagemin-pngquant'),
    optipng           = require('imagemin-optipng'),
    gifsicle          = require('imagemin-gifsicle'),
    jpegtran          = require('imagemin-jpegtran'),
    sourcemaps        = require('gulp-sourcemaps'),
    stripCssComments  = require('gulp-strip-css-comments'),
    merge2            = require('merge2'),
    strip             = require('gulp-strip-comments'),
    notify            = require("gulp-notify"),
    bower_dir         = 'bower_components/';

// CSS
gulp.task('build-scss', function() {
  return merge2(
      gulp.src([
            'src/scss/app.scss',
            'vendor/angular-toastr/angular-toastr.css',
            'vendor/ng-inline-edit/ng-inline-edit.min.css',
            'vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css'

          ])
          .pipe(sass())
          .on("error", notify.onError({
            title: 'Build SCSS Error',
            message: '<%= error.message %>',
            sound: true
          }))
          .on('error', function(error) {
            console.error("Error: "+ error);
            this.emit('end');
          })
  )
      .pipe(sourcemaps.init())
      .pipe(stripCssComments())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss())
      .pipe(sourcemaps.write('../css/'))
      .pipe(gulp.dest('app/dist/css/'));
});

// Angular Dependencies
gulp.task('build-bundle-angular', function() {
  return merge2(
      gulp.src([
            bower_dir + 'angular/angular.js',
            bower_dir + 'angular-mocks/angular-mocks.js',
            bower_dir + 'angular-animate/angular-animate.min.js',
            bower_dir + 'angular-resource/angular-resource.js',
            bower_dir + 'ngstorage/ngStorage.min.js',
            bower_dir + 'angular-cookies/angular-cookies.min.js',
            bower_dir + 'angular-ui-router/release/angular-ui-router.min.js'
          ])
          .on("error", notify.onError({
            title: 'Build Bundle Angular Error',
            message: '<%= error.message %>',
            sound: true
          }))
          .on("error", function(err) {
            console.log("Error: "+ err);
            this.emit('end');
          })
  )
  // .pipe(sourcemaps.write('js/'))
      .pipe(strip())
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('app/dist/js/'));
});

// Controllers
gulp.task('build-controllers', function() {
  return merge2(
      // App file
      gulp.src([
            'src/js/controllers/*.js'
          ])
          .on("error", notify.onError({
            title: 'Build Controllers Error',
            message: '<%= error.message %>',
            sound: true
          }))
          .on("error", function(err) {
            console.log("Error: "+ err);
            this.emit('end');
          })
  )
      .pipe(sourcemaps.write('js/'))
      .pipe(strip())
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('app/dist/modules/'));
});

// Services
gulp.task('build-services', function() {
  return merge2(
      // App file
      gulp.src([
            'src/js/services/*.js',
            'src/js/services/**/*.js'
          ])
          .on("error", notify.onError({
            title: 'Build Services Error',
            message: '<%= error.message %>',
            sound: true
          }))
          .on("error", function(err) {
            console.log("Error: "+ err);
            this.emit('end');
          })
  )
      .pipe(sourcemaps.write('js/'))
      .pipe(strip())
      .pipe(concat('services.js'))
      .pipe(gulp.dest('app/dist/modules/'));
});

// Directives
gulp.task('build-directives', function() {
  return merge2(
      // App file
      gulp.src([
            'src/js/directives/*.js',
            'src/js/directives/**/*.js'
          ])
          .on("error", notify.onError({
            title: 'Build Services Error',
            message: '<%= error.message %>',
            sound: true
          }))
          .on("error", function(err) {
            console.log("Error: "+ err);
            this.emit('end');
          })
  )
      .pipe(sourcemaps.write('js/'))
      .pipe(strip())
      .pipe(concat('directives.js'))
      .pipe(gulp.dest('app/dist/modules/'));
});

// Fonts
gulp.task('build-bundle-fonts', function() {
  return merge2(
      // Libs
      gulp.src([
        bower_dir +'components-font-awesome/fonts/*'
      ])
  )
      .pipe(gulp.dest('app/dist/fonts/'));
});

// Images
gulp.task('build-images', function() {
  gulp.src([
        'src/img/*'
      ])
      .pipe(imagemin({
        progressive: true,
        optimizationLevel: 7,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant(), jpegtran(), optipng(), gifsicle()]
      }))
      .pipe(gulp.dest('app/dist/img/'))
});

// Bundles
gulp.task('build-bundles', [
  'build-bundle-angular',
  'build-bundle-fonts',
  'build-images'
]);

// Watcher
gulp.task('watch', function() {
  gulp.watch([
    "src/scss/**/*.scss"
  ], ['build-scss']);

  gulp.watch([
    "src/imgs/*"
  ], ['build-images']);

  gulp.watch([
    bower_dir +"/*"
  ], ['build-bundles']);

  gulp.watch([
    "src/js/controllers/*.js"
  ], ['build-controllers']);

  gulp.watch([
    'src/js/services/*.js',
    'src/js/services/**/*.js'
  ], ['build-services']);

  gulp.watch([
    'src/js/directives/*.js',
    'src/js/directives/**/*.js'
  ], ['build-directives']);
});

// Tasks
gulp.task('default', [
  'build-scss',
  'build-controllers',
  'build-services',
  'build-directives',
  'watch'
]);
