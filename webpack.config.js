/**
 * (c) Copyright 2017 Trade Street Inc.
 * created by waweru
 */

'use strict';

const gulp = require("gulp");
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const devMiddleware = 'webpack/hot/only-dev-server';
const hotMiddleware = 'webpack-hot-middleware/client?noInfo=true&reload=true';
const VENDOR = [, 'jquery'];
const VERSION = '0.1.0';

const assetsPath = _path => path.posix.join('static', _path);
const resolve = dir => path.join(__dirname, '..', dir);

const plugins = [
    new ExtractTextPlugin("style.css"),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new Dotenv({
        safe: false,
        systemvars: true,
        silent: false
    })
];

const dev = {
    entry: [devMiddleware, hotMiddleware, './src/main.js'],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ].concat(plugins)
};
const prod = {
    entry:  './src/main.js',
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                warnings: false,
                compress: true,
                ie8: false,
                mangle: false,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: Infinity
        })
    ].concat(plugins)
};
const base = {
    output: {
        filename: '[name].js',
        publicPath: '/build',
        path: path.resolve(__dirname, './dist/build')
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|custom_components)/,
                use: [
                    (process.env.NODE_ENV === 'production') ? {
                        loader: 'babel-loader',
                        query: {
                            compact: true
                        }
                    } : {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'webpack-module-hot-accept'
                    }
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'bower_components', 'custom_components'],
        enforceExtension: false,
        alias: {
            'polyfill$': 'babel-polyfill/dist//polyfill.min.js',
            'jquery$': 'jquery/dist/jquery.min.js'
        }
    },
    performance: {
        hints: false
    },
    devtool: (process.env.NODE_ENV === 'production') ? false : '#eval-source-map'
};

module.exports = Object.assign(base, (process.env.NODE_ENV === 'production') ? prod : dev);
