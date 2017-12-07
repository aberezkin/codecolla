const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

let BUILD_DIR = helpers.root('dev-docs');

module.exports = config => webpackMerge(commonConfig({env: ENV}), {
    context: BUILD_DIR,
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: BUILD_DIR,
    }
});