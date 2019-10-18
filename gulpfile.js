
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
/******************************************/
/******************************************/

//  Locations 
let styleSRC = 'src/scss/styles.scss';
let styleDIST = 'dist/css/';

let jsSRC = 'src/js/script.js'
let jsDIST = 'dist/js/'

let imgSRC = 'src/img/*';
let imgDIST = 'dist/images';

let htmlSRC = 'src/pages/*';
let htmlDIST = 'dist/pages'

/******************************************/
/******************************************/

// Watches
let jsWatch = './src/js/*.js';
let styleWatch = './src/scss/**/*.scss';
let imgWatch = imgSRC;
let htmlWatch = htmlSRC;

/******************************************/
/******************************************/

//Running browserSync 
function browser_sync(done){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    done();
}



// Process the Styles
function css(done){
    return gulp.src(styleSRC)
        .pipe(plumber())
        .pipe( sourcemaps.init() )
        .pipe( sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }) )
        .on( 'error', console.error.bind( console ) )
        .pipe( autoprefixer('last 2 versions'))
        .pipe( sourcemaps.write( './') )
        .pipe( gulp.dest( styleDIST ) )
        .pipe(browserSync.stream());

        done()
};

// Processing the Scripts
function js(done){
    return gulp.src(jsSRC)
        .pipe(plumber())
        .pipe( gulp.dest( jsDIST ) );

        done();
}

// Minify Images
 function images(done){
    return gulp.src(imgSRC)
        .pipe(imagemin())
        .pipe(gulp.dest(imgDIST));

        done();

}

//
function html(done){
    return gulp.src(htmlSRC)
        .pipe(gulp.dest(htmlDIST));

         done();
}
function triggerPlumber(src, dist){
    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulp.dest(dist));
}

/******************************************/
/******************************************/

//Initializing Tasks
gulp.task("css", css);
gulp.task("js", js);
gulp.task("images", images);
gulp.task("html", html)
gulp.task("browser", browser_sync);
gulp.task("watch", gulp.series(watch_files, browser_sync));

/******************************************/
/******************************************/

// Running the tasks in a sequence
gulp.task("default", gulp.parallel(css, js, images, html));

/******************************************/
/******************************************/

// Function for watching the Tasks
function watch_files(done){
    gulp.watch(styleWatch, gulp.series(css));
    gulp.watch('./*.html').on('change', browserSync.reload)
    gulp.watch(jsWatch, gulp.series(js, reload));

    done();
}


