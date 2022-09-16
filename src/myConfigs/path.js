const pathSrc = "./src/";
const pathDest = "./public";

module.exports = {
    root: pathDest, 

    html: {
        src:  pathSrc + "*.html",
        watch: pathSrc + "*.html",
        dest: pathDest
    },
    htmlModules: {
        watch: pathSrc + "html/**/*.html",
    },

    css: {
        src: pathSrc + "css/**/*.css",
        watch: pathSrc + "css/**/*.css",
        dest: pathDest + "/css"
    },

    scss: {
        src: pathSrc + "scss/**/*.{sass,scss}",
        watch: pathSrc + "scss/**/*.{sass,scss}",
        dest: pathDest + "/css"
    },


    fonts: {
        src: pathSrc + "fonts/**/*.*",
        watch: pathSrc + "fonts/**/*.*",
        dest: pathDest

    },

    images: {
        src: pathSrc + "img/**/*.{png,jpg,jpeg,svg,gif,mp4,webm}",
        watch: pathSrc + "img/**/*.{png,jpg,jpeg,svg,gif,mp4,webm}",
        dest: pathDest + "/img"
    },

    js: {
        src: pathSrc + "js/**/*.js",
        watch: pathSrc + "js/**/*.js",
        dest: pathDest + "/js"
    },

    exceptions: {
        nodeModules: pathSrc + "!node_modules/**/*.*",
        public: "./!public",
    }

}