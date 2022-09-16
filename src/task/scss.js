const {src, dest} = require("gulp");
const path = require("../myConfigs/path.js");
const autoprefix = require("gulp-autoprefixer");
const shorthand = require("gulp-shorthand");
const sass = require("gulp-sass")(require("sass"));

const scss = () => {
    return src(path.scss.src)
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(dest(path.scss.dest))
}

module.exports = scss;