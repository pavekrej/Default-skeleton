'use strict';

/*
 * SETTINGS
 * ========
 */

// Modules
let gulp = require('gulp');
let fs = require('fs');
let del = require('del');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let watch = require('gulp-watch');
let imagemin = require('gulp-imagemin');
let autoprefixer = require('gulp-autoprefixer');
let stripCssComments = require('gulp-strip-css-comments');

// Variables
let paths = {
    css: {
        source: 'components/components.scss',
        targetWatch: ['components/components.scss', 'components/**/*.scss'],
        targetDevelop: 'build/develop/css',
        targetProduction: 'build/production/css',
        name: 'style',
    },
    js: {
        source: 'components/components.js',
        targetWatch: ['components/components.js', 'components/**/*.js'],
        targetDevelop: 'build/develop/js',
        targetProduction: 'build/production/js',
        name: 'script',
    },
    images: {
        source: ['components/**/images/', 'components/**/images/**.*'],
        targetWatch: ['components/**/images/', 'components/**/images/**.*'],
        targetDevelop: 'build/develop/images',
        targetProduction: 'build/production/images'
    },
    vendorsCss: {
        source: 'vendors/vendors.scss',
        targetWatch: 'vendors/vendors.scss',
        targetDevelop: 'build/develop/vendors',
        targetProduction: 'build/production/vendors',
        name: 'style',
    },
    vendorsJs: {
        source: 'vendors/vendors.js',
        targetWatch: 'vendors/vendors.js',
        targetDevelop: 'build/develop/vendors',
        targetProduction: 'build/production/vendors',
        name: 'script',
    }
};

/*
 * BUILD DEVELOP SOURCES
 * =====================
 */

// Sourcemaps, concat, compile SASS to CSS and autoprefix
gulp.task('develop:css', function () {
    return gulp.src(paths.css.source)
        .pipe(sourcemaps.init())
        .pipe(concat(paths.css.name + '.css'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css.targetDevelop));
});

// Concat JS
gulp.task('develop:js', function () {
    let source = paths.js.source;
    let name = paths.js.name;
    let targetDevelop = paths.js.targetDevelop;
    fs.readFile(source, 'utf8', function(error, data) {
        let paths = data.match(/^\/\/\s?(.*\.js);?.*/gm) || [];
        paths.forEach(function (val, index) {
            paths[index] = val.replace(/(\/\/\s?|;.*)/g, '');
        });
        return gulp.src(paths, {cwd: 'components'})
            .pipe(concat(name + '.js'))
            .pipe(gulp.dest(targetDevelop));
    });
});

// Move images to develop folder
gulp.task('develop:images', function () {
    gulp.src(paths.images.source)
        .pipe(gulp.dest(paths.images.targetDevelop));
});

// Clean images
gulp.task('develop:clean-images', function() {
    del(['build/develop/images']);
});

// Vendors - Sourcemaps, concat, compile SASS to CSS and autoprefix
gulp.task('develop:vendors-css', function () {
    return gulp.src(paths.vendorsCss.source)
        .pipe(sourcemaps.init())
        .pipe(concat(paths.vendorsCss.name + '.css'))
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.vendorsCss.targetDevelop));
});

// Vendors - Concat JS
gulp.task('develop:vendors-js', function () {
    let source = paths.vendorsJs.source;
    let name = paths.vendorsJs.name;
    let targetDevelop = paths.vendorsJs.targetDevelop;
    fs.readFile(source, 'utf8', function(error, data) {
        let paths = data.match(/^\/\/\s?(.*\.js);?.*/gm) || [];
        paths.forEach(function (val, index) {
            paths[index] = val.replace(/(\/\/\s?|;.*)/g, '');
        });
        return gulp.src(paths, {cwd: 'vendors'})
            .pipe(concat(name + '.js'))
            .pipe(gulp.dest(targetDevelop));
    });
});

/*
 * BUILD PRODUCTION SOURCES
 * ========================
 */

// Concat, compile, compress SASS to CSS and autoprefix
gulp.task('production:css', function () {
    return gulp.src(paths.css.source)
        .pipe(concat(paths.css.name + '.min.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.css.targetProduction));
});

// Concat and uglify JS
gulp.task('production:js', function () {
    let source = paths.js.source;
    let name = paths.js.name;
    let targetDevelop = paths.js.targetProduction;
    fs.readFile(source, 'utf8', function(error, data) {
        let paths = data.match(/^\/\/\s?(.*\.js);?.*/gm) || [];
        paths.forEach(function (val, index) {
            paths[index] = val.replace(/(\/\/\s?|;.*)/g, '');
        });
        return gulp.src(paths, {cwd: 'components'})
            .pipe(concat(name + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(targetDevelop));
    });
});

// Minification of images
gulp.task('production:images', function() {
    return gulp.src(paths.images.source)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}],
            verbose: true
        }))
        .pipe(gulp.dest(paths.images.targetProduction));
});

// Clean images
gulp.task('production:clean-images', function() {
    del(['build/production/images']);
});

// Vendors - Sourcemaps, concat, compile SASS to CSS and strip CSS comments
gulp.task('production:vendors-css', function () {
    return gulp.src(paths.vendorsCss.source)
        .pipe(concat(paths.vendorsCss.name + '.min.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(stripCssComments({preserve: false}))
        .pipe(gulp.dest(paths.vendorsCss.targetProduction));
});

// Vendors - Concat and uglify JS
gulp.task('production:vendors-js', function () {
    let source = paths.vendorsJs.source;
    let name = paths.vendorsJs.name;
    let targetProduction = paths.vendorsJs.targetProduction;
    fs.readFile(source, 'utf8', function(error, data) {
        let paths = data.match(/^\/\/\s?(.*\.js);?.*/gm) || [];
        paths.forEach(function (val, index) {
            paths[index] = val.replace(/(\/\/\s?|;.*)/g, '');
        });
        return gulp.src(paths, {cwd: 'vendors'})
            .pipe(concat(name + '.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(targetProduction));
    });
});

/*
 * WATCHER
 * =======
 */

gulp.task('WATCH', ['develop:css', 'develop:js', 'develop:images', 'develop:vendors-css', 'develop:vendors-js'], function () {
    watch(paths.css.targetWatch, function () {
        gulp.start(['develop:css']);
    });
    watch(paths.js.targetWatch, function () {
        gulp.start(['develop:js']);
    });
    watch(paths.images.targetWatch, function () {
        gulp.start(['develop:clean-images']);
        setTimeout(function () {
            gulp.start(['develop:images']);
        }, 400);
    });
    watch(paths.vendorsCss.targetWatch, function () {
        gulp.start(['develop:vendors-css']);
    });
    watch(paths.vendorsJs.targetWatch, function () {
        gulp.start(['develop:vendors-js']);
    });
});


/*
 * TASKS
 * =====
 */

gulp.task('BUILD DEVELOP SOURCES', ['develop:css', 'develop:js', 'develop:images', 'develop:vendors-css', 'develop:vendors-js']);
gulp.task('BUILD PRODUCTION SOURCES', ['production:css', 'production:js', 'production:clean-images', 'production:images', 'production:vendors-css', 'production:vendors-js']);