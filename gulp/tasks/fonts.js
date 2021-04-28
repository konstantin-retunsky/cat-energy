const gulp = require('gulp')
const path = require('../pathTasks')

module.exports = function fonts() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
}