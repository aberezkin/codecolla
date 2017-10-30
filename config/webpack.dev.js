const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = config => webpackMerge(commonConfig({env: ENV}), {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Codecolla',
            filename: 'index-dev.html',
            template: helpers.root("/src/dev/index.ejs"),
        })
    ]
});