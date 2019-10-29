const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');

const paths = {
    html: ['./*.html'],
    sass: ['./sass/**/*.scss'],
    scripts: ['./js/**/*.js'],
    images: ['./img/**/*'],
    extras: ['favicon.ico'],
}

function html() {
    return src(paths.html)
        .pipe(dest('./dist'))
}

function css() {
    return src(paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css'))
}

function js() {
    return src(paths.scripts)
        .pipe(dest('./dist/js/'))
}

function img() {
    return src(paths.images)
        .pipe(dest('./dist/img'))
}

function copy() {
    return src(paths.extras)
        .pipe(dest('./dist'))
}

function watcher() {
    watch(paths.html, html);
    watch(paths.sass, css);
    watch(paths.scripts, js);
    watch(paths.images, img);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.copy = copy;
exports.watcher = watcher;
exports.default = parallel(html, css, img, js, copy);
