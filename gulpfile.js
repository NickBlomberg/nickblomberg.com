const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

const sassPath = './sass/**/*.scss';
const imgPath = './img/**/*'

function html() {
    return src('./*.html')
        .pipe(dest('./dist'))
}

function css() {
    return src(sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
}

function img() {
    return src(imgPath)
        .pipe(dest('./dist/img'))
}

function watcher() {
    watch(sassPath, css, html);
    watch(imgPath, img);
}

exports.html = html;
exports.css = css;
exports.img = img;
exports.watcher = watcher;
exports.default = parallel(html, css, img);
