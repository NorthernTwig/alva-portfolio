'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const browserify = require('browserify')
const babelify = require('babelify')
const fs = require('fs')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const reload = browserSync.reload

gulp.task('js', ['babel'], () => {
    return gulp.src('./public/js/minified/bundle.js')
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('public/js/minified'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('babel', () => {
    return browserify('./public/js/main.js')
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(fs.createWriteStream('./public/js/minified/bundle.js'))
})

gulp.task('sass', () => {
    return gulp.src('./public/scss/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
})

gulp.task('watch-js', ['js'], (done) => {
    browserSync.reload()
    done()
})

gulp.task('browser-sync', ['js', 'sass'], () => {
    browserSync.init({
        proxy: 'http://localhost:3000',
        files: ['public/**/*.*'],
        port: 5000
    })
})

gulp.task('default', ['browser-sync'], () => {
    gulp.watch(['./public/scss/*.scss'], ['sass'])
    gulp.watch(['./public/js/*.js', './public/js/modules/*.js'], ['watch-js'])
    gulp.watch(['./views/**/*.hbs'], reload)
})
