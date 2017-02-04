/**
 * Created by zhang on 2017/2/3.
 */
'use strict';

/*
* 1：Less 编译 压缩 合并
* 2：JS合并 压缩 混淆
* 3：img的复制
* 4：html压缩
* */


//在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');

//任务一：Less 编译 压缩 合并(这里的合并没有必要，一般预处理CSS都可以导包)
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style',function(){
    //这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));

});


//任务二：JS合并 压缩混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream:true
        }));

});

//任务三：img的复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));

});

//任务四：html的压缩
var htmlmin = require('gulp-htmlmin');

gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace:true,
            removeComments:true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream:true
        }));
});


//测试服务器
var browserSync = require('browser-sync');
var reload = browserSync.reload;


gulp.task('serve',function(){
    browserSync({
        server:{
            baseDir:['dist/']
        }
    },function(err,bs){
        console.log(bs.options.getIn(["urls","local"]));
    });

    gulp.watch('src/styles/*.less',['style']);
    gulp.watch('src/scripts/*.js',['script']);
    gulp.watch('src/images/*.*',['image']);
    gulp.watch('src/*.html',['html']);
});
















