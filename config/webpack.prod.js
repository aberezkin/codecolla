const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = config => webpackMerge(commonConfig({env: ENV}), {
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Codecolla',
            filename: 'index.html',
            template: helpers.root("/src/dev/index.ejs"),
        })
    ]
});