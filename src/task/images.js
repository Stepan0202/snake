const{src, dest} = require("gulp"); // берем методі src и dest из запрошенного j,]trnf gulp
const path = require("../myConfigs/path.js");
const images = function(){
    return src(path.images.src)
    .pipe(dest(path.images.dest))
}

module.exports = images;