var gulp = require('gulp'),
  semver = require('semver'),
  shell = require('gulp-shell'),
  watch = require('gulp-watch'),
  bump = require('gulp-bump'),
  pkg = require('./package.json'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  htmlreplace = require('gulp-html-replace');

gulp.task('styles', function() {
  return gulp.src('frame/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('frame/css'))
});

gulp.task('deploy-master', function() {
  var newVer = semver.inc(pkg.version, 'patch');
  return gulp.src(['./package.json'])
    .pipe(bump({
      version: newVer
    }))
    .pipe(gulp.dest('./'))
    .on('end', shell.task([
      'git add --all',
      'git commit -m "' + newVer + '"',
      'git tag -a "' + newVer + '" -m "' + newVer + '"',
      'git push origin master',
      'git push origin --tags'
    ]));
});

gulp.task('build', ['styles'], function() {
  gulp.src('./')
    .pipe(shell([
      'jspm bundle-sfx --minify frame/lib/index',
      'cp -f ./build.js ./build/',
      'cp -rf ./frame/css ./build && cp -rf ./frame/images ./build/images',
      'cp -f jspm_packages/traceur-runtime.js ./build',
      'cp -f ./frame/boot.js ./build'
    ]));

  gulp.src('./frame/index.html')
    .pipe(htmlreplace({
      src: 'frame/index.html',
      'js': {
        src: ['traceur-runtime.js', 'build.js']
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch('frame/scss/**/*.scss', ['styles']);
});

gulp.task('link', function(cb) {
  watch(['lib/**/*'], shell.task([
    'jspm link github:toddmoore/interactive-anzac-day@dev -y'
  ]));
});
