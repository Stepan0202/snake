const {src, dest} = require("gulp");
const path = require("../myConfigs/path.js");
const gulpConcat = require("gulp-concat");
const cssimport = require("gulp-cssimport");
const autoprefix = require("gulp-autoprefixer");
const shorthand = require("gulp-shorthand");


const css = () => {
    return src([path.css.src, path.exceptions.nodeModules], {sourcemaps: true})
    .pipe(shorthand())
    .pipe(dest(path.css.dest))
    .pipe(gulpConcat("main.css"))
    .pipe(cssimport())
    .pipe(autoprefix({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true}))
    .pipe(dest(path.css.dest), {sourcemaps: true})
}

module.exports = css;