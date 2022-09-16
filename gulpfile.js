const{ watch, series, parallel} = require("gulp"); // берем методі src и dest из запрошенного j,]trnf gulp
const html = require("./src/task/html");
const scss = require("./src/task/scss");
const js = require("./src/task/js.js")
const fonts = require("./src/task/fonts.js");
const images = require("./src/task/images");
const clear = require("./src/task/clear");
const path = require("./src/myConfigs/path");
// const del = require("./src/task/clear");

// Plugins

const browserSync = require("browser-sync").create();

const watcher = () => {
    
    watch([path.html.watch, path.htmlModules.watch]).on("all", series(html, browserSync.reload));
    watch([path.scss.watch, path.exceptions.nodeModules]).on("all", series(scss, browserSync.reload));
    watch([path.js.watch, path.exceptions.nodeModules]).on("all", series(js, browserSync.reload));
    watch(path.images.watch).on("all", series(images, browserSync.reload));
    watch(path.fonts.watch).on("all", series(fonts,browserSync.reload));
    
}
    

const server = () => {
        browserSync.init({
            server:{
                baseDir: path.root,
            }
        })
    }

    exports.dev = series(
        // del,
    html, 
    scss,
    js,
    images,
    fonts,
    parallel(watcher, server)
);

exports.html = html;
exports.fonts = fonts;
exports.clear = clear;
exports.images = images;
exports.scss = scss;