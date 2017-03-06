/*1.less压缩合并*/

/*2.js合并，压缩，混淆*/

/*3.img复制*/

/*4.html压缩*/

/*先载入gulp包*/
var gulp = require('gulp');//引入gulp包
var less = require('gulp-less');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');

/*1 less压缩，css压缩*/
gulp.task('style',function(){
    gulp.src('src/css/*.less').pipe(less()).pipe(cssnano()).pipe(gulp.dest('dist/css')).pipe(browserSync.reload({stream:true}));
});//当less文件变化时通知浏览器刷新

/*2 js合并 压缩 混淆*/

gulp.task('script',function(){
    gulp.src('src/js/*.js').pipe(concat('all.js')).pipe(uglify()).pipe(gulp.dest('dist/js')).pipe(browserSync.reload({stream:true}));
});//当script发生变化时通知浏览器刷新

/*3 图片复制*/

gulp.task('img',function(){
    gulp.src('src/img/*.*').pipe(gulp.dest('dist/img')).pipe(browserSync.reload({stream:true}));
});

/*4 html处理*/

gulp.task('html',function(){
    gulp.src('src/*.html').pipe(htmlmin({collapseWhitespace: true})).pipe(gulp.dest('dist/')).pipe(browserSync.reload({stream:true}));//当html发生变化时通知浏览器刷新
});

/*5 架设本地服务器监视 browser-sync*/

gulp.task('serve', function () {
    browserSync({server:'./dist'},
        function (err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    /*事件监听*/
    gulp.watch('src/css/*.less',['style']);
    gulp.watch('src/js/*.js',['script']);
    gulp.watch('src/img/*.*',['img']);
    gulp.watch('src/*html',['html']);
});