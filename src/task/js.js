const {src, dest} = require("gulp");
const path = require("../myConfigs/path.js");

const js = () =>{
    return src(path.js.src)
    .pipe(dest(path.js.dest))
}

module.exports = js;