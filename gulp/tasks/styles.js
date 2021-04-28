const { src, dest, parallel, series, watch } = require('gulp')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const concat = require('gulp-concat')
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const path = require('../pathTasks')
var mmq = require('gulp-merge-media-queries');

module.exports = function sytle(cb) {
  return src(path.src.styles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({dirname: ''}))
    .pipe(concat('style.css'))
    .pipe(mmq())
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.styles))
    .pipe(cleanCSS({
      debug: true,
      compatibility: '*'
    }, details => {
      console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(path.build.styles))
}