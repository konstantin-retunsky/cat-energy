const { src, dest, parallel, series, watch } = require('gulp')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin');
const path = require('../pathTasks')

module.exports = function spriteMulti() {
  return src(path.src.spriteMulti)
    .pipe(svgstore())
    .pipe(rename('sprite-multi.svg'))
    .pipe(dest(path.build.svgSprite))
}
