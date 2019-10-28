const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

const sassPath = './sass/*.scss';

function css() {
    return src(sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
}

function watcher() {
    watch(sassPath, css);
}

exports.css = css;
exports.watcher = watcher;
exports.default = parallel(css);
