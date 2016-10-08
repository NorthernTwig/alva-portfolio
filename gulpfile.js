'use strict'

const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const browserify = require('browserify')
const babelify = require('babelify')
const reactify = require('reactify')
const fs = require('fs')
const watchify = require('watchify')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')
const traceur = require('gulp-traceur')
const gutil = require('gulp-util')
const sourcemaps = require('gulp-sourcemaps')
const reload = browserSync.reload

// gulp.task('js', () => {
//
//   let b = browserify({
//     entries: './public/js/main.js',
//     debug: true,
//     transform: ['es2015']
//   })
//
//   return b.bundle()
//   //     .transform('babelify', {
//   //         presets: ['es2015']
//   //     })
//   .pipe(source('main.js'))
//   .pipe(buffer())
//   .pipe(uglify())
//   .pipe(sourcemaps.init({loadMaps: true}))
//   .pipe(gulp.dest('./public/js/minified'))
//
// })

gulp.task('babel', () => {
    browserify('./public/js/main.js')
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .bundle()
        .pipe(fs.createWriteStream('./public/js/minified/bundle.min.js'));
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

gulp.task('watch-js', ['babel'], (done) => {
    browserSync.reload()
    done()
})

gulp.task('browser-sync', ['babel', 'sass'], () => {
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
