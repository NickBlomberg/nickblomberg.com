const { src, dest, parallel, watch, series } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg')
const pngquant = require('imagemin-pngquant');
const gulpWebp = require('gulp-webp');

const paths = {
    html: ['./*.html'],
    sass: ['./sass/**/*.scss'],
    scripts: ['./js/**/*.js'],
    images: ['./img/**/*'],
    extras: ['favicon.ico', 'robots.txt'],
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
        .pipe(imagemin([
            pngquant({ quality: [0.7, 0.7] }),
            mozjpeg({ quality: 80 })
        ]))
        .pipe(dest('./dist/img'))
}

function webp() {
    return src(paths.images)
        .pipe(gulpWebp({
            quality: 80,
        }))
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
    watch(paths.images, series(img, webp));
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.webp = webp;
exports.copy = copy;
exports.watcher = watcher;
exports.default = parallel(html, css, img, webp, js, copy);
