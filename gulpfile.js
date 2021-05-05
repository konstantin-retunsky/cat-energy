const { src, dest, parallel, series, watch } = require('gulp')
const html = require('./gulp/tasks/html')
const styles = require('./gulp/tasks/styles')
const scripts = require('./gulp/tasks/scripts')
const images = require('./gulp/tasks/images')
const spriteMono = require('./gulp/tasks/spriteMono')
const spriteMulti = require('./gulp/tasks/spriteMulti')
const fonts = require('./gulp/tasks/fonts')
const clean = require('./gulp/tasks/clean')
const fs = require('fs')
const browserSync = require('./gulp/tasks/browserSync')


const setMode = (isProduction = false) => {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}

const dev = parallel(html, styles, scripts, fonts, images, spriteMono, spriteMulti)
const build = series(clean, dev)

module.exports.dev = series(setMode(), build, browserSync)
module.exports.build = series(setMode(true), build)

