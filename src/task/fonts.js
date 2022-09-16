const{src, dest} = require("gulp"); // берем методі src и dest из запрошенного j,]trnf gulp

const fonts = function(){
    return src("./fonts/*.*")
    .pipe(dest("./public/fonts"))
}

module.exports = fonts;