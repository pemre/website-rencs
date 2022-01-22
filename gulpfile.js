var gulp = require('gulp'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    htmlreplace = require('gulp-html-replace'),
    jsonminify = require('gulp-jsonminify');

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('replace', ['clean'], function() {
    return gulp.src('index.html')
        .pipe(htmlreplace({
            replaceCss: {
                src: gulp.src('css/*.css')
                    .pipe(minifyCSS()),
                tpl: '<style>%s</style>'
            },
            replaceJsModernizr: {
                src: gulp.src('js/modernizr.js'),
                tpl: '<script>%s</script>'
            },
            replaceJsJQuery: {
                src: gulp.src('js/jquery.min.js'),
                tpl: '\n<script>%s</script>'
            },
            replaceJsPlugins: {
                src: gulp.src('js/plugins.js')
                    .pipe(uglify()),
                tpl: '\n<script>%s</script>'
            },
            replaceJsMain: {
                src: gulp.src('js/main.js')
                    .pipe(uglify()),
                tpl: '\n<script>%s</script>'
            }
        }))
        //.pipe(minifyHTML({ conditionals: true, loose: true }))
        .pipe(gulp.dest('dist'));
});

/*gulp.task('html', ['replace'], function() {
    var opts = {
        conditionals: true
    };
    return gulp.src('*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist'))
});*/

/*gulp.task('js', ['clean'], function () {
    return gulp.src(['js/plugins.js', 'js/main.js'])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'))
});*/

/*gulp.task('css', ['clean'], function () {
    return gulp.src('css/!*.css')
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
});*/

gulp.task('json', ['clean'], function () {
    return gulp.src('i18n/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('dist/i18n'))
});

gulp.task('image', ['clean'], function () {
	return gulp.src('*img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist'))
});

gulp.task('copy', ['clean'], function () {
    return gulp.src([
        '.htaccess',
        'manifest.json',
        'sw.js',
        '*.png',
        '*.ico',
        '*fonts/**/*',
        //'*img/**/*'
    ])
        .pipe(gulp.dest('dist'))
});

gulp.task('default', [
    'clean',
    'replace',
    //'html',
    //'js',
    //'css',
    'json',
    'image',
    'copy'
]);
