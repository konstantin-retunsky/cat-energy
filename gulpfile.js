const { src, dest, parallel, series, watch } = require('gulp')
const html = require('./gulp/tasks/html')
const styles = require('./gulp/tasks/styles')
const scripts = require('./gulp/tasks/scripts')
const images = require('./gulp/tasks/images')
const svgSprite = require('./gulp/tasks/svgSprite')
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

const dev = parallel(html, styles, scripts, fonts, images, svgSprite)
const build = series(clean, dev)
// const build = series(html)

// module.exports.dev = 
//   fs.existsSync('build')
//     ? series(setMode(), browserSync)
//     : series(setMode(), dev, browserSync)

module.exports.dev = series(setMode(), build, browserSync)
module.exports.build = series(setMode(true), build)

