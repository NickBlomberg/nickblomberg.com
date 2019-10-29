const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

const sassPath = './sass/**/*.scss';

function html() {
    return src('./*.html')
        .pipe(dest('./dist'))
}

function css() {
    return src(sassPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
}

function watcher() {
    watch(sassPath, css, html);
}

exports.html = html;
exports.css = css;
exports.watcher = watcher;
exports.default = parallel(html, css);
