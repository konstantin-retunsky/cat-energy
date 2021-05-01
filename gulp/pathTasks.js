
module.exports = {
  src: {
    styles: ["./source/global/scss/global_style.scss", "./source/pages/**/*.scss"],
    html: "./source/pages/**/*.{njk,html}",
    scripts: "./source/**/*.js",
    images: "./source/**/images/*.{jpg,png,svg,ico}",
    svgSprite: "./source/**/sprite/*.svg",
    fonts: "./source/global/fonts/*",
  },
  build: {
    styles: "build/css",
    html: "build",
    scripts: "build/js",
    images: "build/img",
    svgSprite: "build/img",
    fonts: "build/fonts",
  },
  browserSync: {
    build: "build",
    html: "./source/**/*.{njk,html}",
    styles: "./source/**/*.scss",
    images: "./source/**/images/*.{jpg,png,svg,ico}",
    svgSprite: "./source/**/sprite/*.svg",
    scripts: "./source/**/*.js",
  }
}
