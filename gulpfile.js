/**
 * Created by zhang on 2017/2/3.
 */
'use strict';

/*
* 1��Less ���� ѹ�� �ϲ�
* 2��JS�ϲ� ѹ�� ����
* 3��img�ĸ���
* 4��htmlѹ��
* */


//��gulpfile��������gulp������Ϊ������ṩ��һЩAPI
var gulp = require('gulp');

//����һ��Less ���� ѹ�� �ϲ�(����ĺϲ�û�б�Ҫ��һ��Ԥ����CSS�����Ե���)
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style',function(){
    //��������ִ��style����ʱ�Զ�ִ�е�
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream:true
        }));

});


//�������JS�ϲ� ѹ������
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

//��������img�ĸ���
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream:true
        }));

});

//�����ģ�html��ѹ��
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


//���Է�����
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
















