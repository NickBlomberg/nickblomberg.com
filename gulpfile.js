const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

const htmlPath = './*.html';
const sassPath = './sass/**/*.scss';
const jsPath = './js/**/*.js';
const imgPath = './img/**/*'

function html() {
    return src(htmlPath)
        .pipe(dest('./dist'))
}

function css() {
    return src(sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
}

function js() {
    return src(jsPath)
        .pipe(dest('./dist/js/'))
}

function img() {
    return src(imgPath)
        .pipe(dest('./dist/img'))
}

function watcher() {
    watch(htmlPath, html);
    watch(sassPath, css);
    watch(jsPath, js);
    watch(imgPath, img);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.watcher = watcher;
exports.default = parallel(html, css, img, js);
