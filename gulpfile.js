var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

var path = {
  base: './',
  dist: 'dist'
};

gulp.task('ghPages', [], function() {
  var paths = [
    path.base+'/{index.html,config.js,build.js,build.js.map}',
    path.base+'/{jspm_packages,lib}/*.{js,map}',
    path.base+'/{jspm_packages,lib}/github/jmcriffey/**/*.js'
  ];

  return gulp.src(paths)
    .pipe(ghPages());
});
