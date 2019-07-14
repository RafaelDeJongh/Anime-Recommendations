// Gulp.js configuration.
'use strict'

const
  // Gulp and plugins.
  gulp         = require('gulp'),
  newer        = require('gulp-newer'),
  hb           = require('gulp-hb'),
  htmlmin      = require('gulp-htmlmin'),
  imagemin     = require('gulp-imagemin'),
  webp         = require('gulp-webp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass         = require('gulp-sass'),
  cleanCSS     = require('gulp-clean-css'),
  babel        = require('gulp-babel'),
  uglify       = require('gulp-uglify'),
  concat       = require('gulp-concat'),
  sourcemaps   = require('gulp-sourcemaps'),
  rename       = require('gulp-rename'),
  gutil        = require('gulp-util'),

  // Source and build folders.
  dir = {
    src:   './src',
    build: './public'
  }

  var browsersync = false


// -------------------------------------------------------------------


// HTML
const html = {
  src     : dir.src + '/index.hbs',
  partials: dir.src + '/partials/**/*.hbs',
  build   : dir.build,
}

const compileMarkup = () => {
  return gulp.src(html.src)
    .pipe(newer(html.build))
    .pipe(hb().partials(html.partials))
    .pipe(rename('index.html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(html.build))
}

const watchMarkup = () => {
  let watch = gulp.watch(html.src)
  watch.on('all', () => {
    compileMarkup()
    browsersync ? browsersync.reload : {}
  })
}


// -------------------------------------------------------------------


// Styles
var css = {
  src  : dir.src + '/sass/**/*',
  build: dir.build + '/css'
}

const compileStyle = () => {
  return gulp.src(css.src)
    .pipe(newer(css.build))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(concat('bundle.css'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(css.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop())
}

const watchStyle = () => {
  let watch = gulp.watch(css.src)
  watch.on('all', () => {
    compileStyle()
  })
}


// -------------------------------------------------------------------


// Scripts
const js = {
  src: dir.src + '/js/**/*',
  build: dir.build + '/js'
}

const compileScript = () => {
  return gulp.src([
      './src/js/lazysizes.min.js',
      './src/js/index.js'
    ])
    .pipe(newer(js.build))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(js.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop())
}

const watchScript = () => {
  let watch = gulp.watch(js.src)
  watch.on('all', () => {
    compileScript()
  })
}


// -------------------------------------------------------------------


// Images
const img = {
  src  : dir.src + '/img/**/*',
  build: dir.build + '/img'
}

const compileImage = () => {
  return gulp.src(img.src)
    .pipe(newer(img.build))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(img.build))
    .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop())
}

const watchImage = () => {
  let watch = gulp.watch(img.src)
  watch.on('all', () => {
    compileImage()
  })
}

// Anime Covers
const covers = {
  src  : dir.src + '/img/covers/**/*',
  build: dir.build + '/img/covers'
}

const compileCover = () => {
  return gulp.src(covers.src)
    // .pipe(newer(covers.build))
    .pipe(webp())
    .pipe(gulp.dest(covers.build))
    // .pipe(browsersync ? browsersync.reload({ stream: true }) : gutil.noop())
}


// -------------------------------------------------------------------


// JSON
const json = {
  src     : './anime.json',
  build   : dir.build,
}

const compileJSON = () => {
  return gulp.src(json.src)
    .pipe(newer(json.build))
    .pipe(gulp.dest(json.build))
}


// -------------------------------------------------------------------


// BrowserSync
const syncOpts = {
  files  : dir.build + '**/*',
  open: false,
  server: {
    baseDir: dir.build,
  }
}

const startServer = () => {
  browsersync = require('browser-sync').create()
  browsersync.init(syncOpts)
}


// -------------------------------------------------------------------


const compile = gulp.parallel(compileMarkup, compileScript, compileStyle, compileCover, compileImage, compileJSON)
compile.description = 'compile all sources'

const serve = gulp.series(compile, startServer)
serve.description = 'serve compiled source on local server at port 3000'

const watch = gulp.parallel(watchMarkup, watchScript, watchStyle, watchImage)
watch.description = 'watch for changes to all source'

const defaultTasks = gulp.parallel(serve, watch)
defaultTasks.description = 'serve & watch for changes to all source'

module.exports = {
  compile,
  compileMarkup,
  compileScript,
  compileStyle,
  compileImage,
  compileCover,
  compileJSON,
  serve,
  watch,
  watchMarkup,
  watchScript,
  watchStyle,
  watchImage,
  default: defaultTasks
}
