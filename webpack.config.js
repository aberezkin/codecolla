const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let BUILD_DIR = path.resolve(__dirname, 'docs');
let APP_DIR = path.resolve(__dirname, 'src/dev');

let config = {
    context: BUILD_DIR,
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.js?/,
                include: APP_DIR,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            }, {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }, {
                test   : /\.woff/,
                loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
            }, {
                test   : /\.ttf/,
                loader : 'file?prefix=font/'
            }, {
                test   : /\.eot/,
                loader : 'file?prefix=font/'
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'}
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            title: 'Custom template',
            template: "../src/dev/index.ejs",
        })
    ]
};

module.exports = config;