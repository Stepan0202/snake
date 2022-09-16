const{src, dest} = require("gulp"); // берем методі src и dest из запрошенного j,]trnf gulp
const path = require("../myConfigs/path.js");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
// Plugins
const fileInclude = require("gulp-file-include");
const html = function(cb){
    return src([path.html.src, path.exceptions.nodeModules]) // входящий файл
    //плагины что-то делают с входящим файлом
    .pipe(fileInclude())
    .pipe(dest(path.html.dest)) //изменененный файл записывается там, где указано в dest()

}

module.exports = html;