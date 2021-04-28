const { src, dest, parallel, series, watch } = require('gulp')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin');
const gulpWebp = require('gulp-webp');
const path = require('../pathTasks')

module.exports = function images() {
  return src(path.src.images)
  .pipe(imagemin([
    imagemin.optipng({ optimizationLevel: 3 }),
    imagemin.mozjpeg({ quality: 80, progressive: true }),
    imagemin.svgo()
  ]))
  .pipe(rename({dirname: ''}))
  .pipe(dest(path.build.images))
  .pipe(src(path.src.images))
  .pipe(gulpWebp({quality: 80}))
  .pipe(rename({dirname: ''}))
  .pipe(dest(path.build.images))
}