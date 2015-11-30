"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

gulp.task( 'webpack:build', function (callback) {
    webpack( require('./webpack.config.js'), function (err, stats) {
        if (err) throw new gutil.PluginError( "webpack:build", err );
        gutil.log( "[webpack:build]", stats.toString({
            colors: true
        }) );
        callback();
    });
});

gulp.task( 'default', [ 'webpack:build' ] );
