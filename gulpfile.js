const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

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
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('maps'))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

function js() {
    return src(paths.scripts)
        .pipe(uglify())
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
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    watch(paths.html, html).on('change', browserSync.reload);
    watch(paths.sass, css);
    watch(paths.scripts, js).on('change', browserSync.reload);
    watch(paths.images, img);
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.copy = copy;
exports.watcher = watcher;
exports.default = parallel(html, css, img, js, copy);
