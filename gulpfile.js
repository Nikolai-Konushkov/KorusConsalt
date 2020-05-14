var gulp       = require('gulp'), //  Gulp
    sass         = require('gulp-sass'), // Sass ,
    browserSync  = require('browser-sync'), //  Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // сжатие JS
    cssnano      = require('gulp-cssnano'), // минификация CSS
    rename       = require('gulp-rename'), // Библиотека для переименования файлов
    del          = require('del'), // Библиотека для удаления файлов и папок
    cache        = require('gulp-cache'), // Библиотека кеширования
    autoprefixer = require('gulp-autoprefixer');// Автопрефиксер

gulp.task('sass', function() { 
    return gulp.src('app/sass/**/*.sass') 
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('code', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('clean', async function() {
    return del.sync('dist');
});

gulp.task('prebuild', async function() { // Таск на production

    var buildCss = gulp.src([
        'app/css/main.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
    return cache.clearAll();
})

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); 
    gulp.watch('app/*.html', gulp.parallel('code')); 
});
gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'sass'));