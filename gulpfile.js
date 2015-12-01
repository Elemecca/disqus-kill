"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');


function webpackHandler (callback) {
}

gulp.task( 'webpack:build', function (callback) {
    var compiler = webpack( require('./webpack.config.js') );
    compiler.run( function (err, stats) {
        if (err) throw new gutil.PluginError( "webpack:build", err );

        gutil.log( "[webpack:build]", stats.toString({
            colors: true,
        }) );

        callback();
    } );
});

gulp.task( 'webpack:watch', function (callback) {
    var compiler = webpack( require('./webpack.config.js') );
    compiler.watch( {}, function (err, stats) {
        if (err) {
            gutil.log( '[webpack:watch]', err );
        } else {
            gutil.log( '[webpack:watch]', stats.toString({
                colors: true,
            }) );
        }
    });
});

gulp.task( 'default', [ 'webpack:build' ] );
