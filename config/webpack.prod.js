const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = config => webpackMerge(commonConfig({env: ENV}), {
    plugins: [
        new UglifyJsPlugin({
            beautify: false,
            output: {
                comments: false
            },
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            },
        }),
        new OptimizeJsPlugin({
            sourceMap: false, 
        }),
        new HtmlWebpackPlugin({
            title: 'Codecolla',
            filename: 'index.html',
            template: helpers.root("/src/dev/index.ejs"),
        }),
    ]
});