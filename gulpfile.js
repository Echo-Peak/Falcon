var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var sassify = require('gulp-sass');
var concat = require('gulp-concat');
var jadify = require('gulp-jade');
var watchify = require('gulp-watch');
var browserSync = require('browser-sync').create();

var webpack = require('webpack');

function deErrorify(done){
  return{
    errorHandler:function(err){
      console.log('\007')
      done(err)
    }
  }
}

gulp.task('init',['html','webpack','server'])

gulp.task('html',function(){
  return gulp.src('./src/index.jade')
      .pipe(plumber())
      .pipe(jadify())
      .pipe(gulp.dest('./built'))
      .pipe(browserSync.reload({stream:true}));
});

gulp.task('scss', function(done){
 return gulp.src('./src/scss/*.scss')
 .pipe(plumber(deErrorify(done)))
 .pipe(sassify())
 .pipe(concat('styles.css'))
 .pipe(gulp.dest('./built'))
 .pipe(browserSync.reload({stream:true}))
});

gulp.task('server',function(){
  browserSync.init({
      server: './built',
      port: 6101,
      ui:{
        port:6150
      },

      ui:false,
      notify:false,
      online:true,

  });
});
gulp.task('webpack' ,function(){
  webpack(require('./webpack.config'),function(err){
    if(err){
      console.log(err)
    }
    browserSync.reload()
  })
});
watchify('./src/*.jade' ,e => gulp.start('html'));
watchify('./src/scss/*.scss' ,e => gulp.start('scss'));
