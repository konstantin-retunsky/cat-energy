const { src, dest, parallel, series, watch } = require('gulp')
const svgstore = require('gulp-svgstore')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin');
const path = require('../pathTasks')

module.exports = function spriteMono() {
  return src(path.src.spriteMono)
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false},
            { removeAttrs: {attrs: '(stroke|fill)'} },
        ]
      })
    ]))
    .pipe(rename('sprite-mono.svg'))
    .pipe(dest(path.build.svgSprite))
}
