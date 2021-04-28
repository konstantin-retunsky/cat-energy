const { src, dest, parallel, series, watch } = require('gulp')
const rename = require('gulp-rename')
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')
const eslint  = require('gulp-eslint')
const babel = require('gulp-babel')
const terser = require('gulp-terser')
const concat = require('gulp-concat')
const path = require("../pathTasks")

module.exports = function scripts() {
  return  src(path.src.scripts)
    .pipe(concat('script.js'))
    .pipe(plumber())
    // .pipe(eslint())
    // .pipe(eslint.format())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(rename({dirname: ''}))
    .pipe(dest('build/js'))
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(path.build.scripts))
}