/**
 * (c) Copyright 2017 Trade Street Inc.
 * created by waweru
 */

'use strict';

const gulp = require("gulp");
const webpack = require('webpack');
const browserSync = require('browser-sync');
const del = require('del');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const web = browserSync.create('Trade Street - Control Panel Server');
const compiled = webpack(webpackConfig);

const server = (port, baseDir) => {
    web.init({
        server: {
            baseDir: baseDir,
            directory: true
        },
        open: false,
        ghostMode: false,
        reloadOnRestart: true,
        notify: true,
        port: port,
        middleware: [
            require("connect-logger")(),
            require('connect-history-api-fallback')(),
            webpackDevMiddleware(compiled, {
                publicPath: webpackConfig.output.publicPath,
                stats: {
                    colors: true
                },
                noInfo: true
            }),
            webpackHotMiddleware(compiled, {
                log: false,
                heartbeat: 1500
            })
        ],
        logLevel: 'info',
        logConnections: true,
        logPrefix: 'TradeStreet',
        injectChanges: false,
        minify: false
    })
    .emitter.on('init', function () {
        console.log('Dev Web Server up and running');
    });
};
gulp.task("serve", () => {
    server(process.env.PORT || 3000, './dist');
});
// clean all build files
gulp.task("clean", (done) => {
    return del([
        'dist/build/**/*'
    ]);
});
