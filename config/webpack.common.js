const webpack = require('webpack');
const path = require('path');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let BUILD_DIR = helpers.root('docs');
let APP_DIR = helpers.root('src');

module.exports = config => {
    return {
        context: BUILD_DIR,
        entry: [
            'react-hot-loader/patch',
            APP_DIR + '/index.jsx'
        ],
        output: {
            path: BUILD_DIR,
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
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
                title: 'Codecolla',
                filename: 'index.html',
                template: helpers.root("/src/index.ejs"),
            })
        ]
    }
};