

const { src, dest, parallel, series, watch } = require("gulp");
const gulpNunjucks = require("gulp-nunjucks-render");
const rename = require("gulp-rename");
const gulpHtmlBemValidator = require("gulp-html-bem-validator");
const plumber = require("gulp-plumber");
const path = require("../pathTasks");
const manageEnvironment = require("../../core/custom-filters-nunjucks")

module.exports = function html(cb) {
  return src(path.src.html)
    .pipe(plumber())
    .pipe(
      gulpNunjucks({
        path: "./source",
        ext: ".html",
        manageEnv: manageEnvironment
      })
    )
    .pipe(rename({ dirname: "" }))
    .pipe(gulpHtmlBemValidator())
    .pipe(dest(path.build.html));
};
