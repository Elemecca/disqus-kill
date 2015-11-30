"use strict";

var meta = require('./package.json');
var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join( __dirname, 'dist' ),
        filename: 'disqus-kill.user.js',
    },
    module: {
        loaders: [
            {   test:    /\.js$/,
                exclude: /node_modules/,
                loader:  'babel-loader',
            },
            {   test:    /\.css$/,
                loaders: [ 'style', 'css' ],
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin(
              "// ==UserScript==\n"
            + "// @name        Disqus Kill\n"
            + "// @namespace   maltera.com\n"
            + "// @version     " + meta.version + "\n"
            + "// @description Implements KILL files for Disqus comments.\n"
            + "// @include     https://disqus.com/embed/comments/*\n"
            + "// @grant       none\n"
            + "// ==/UserScript==\n",
            {   raw: true,
                entryOnly: true,
            }
        ),
    ],
    devtool: 'inline-source-map',
};
