module.exports = process.env.NODE_ENV == 'production' ?
    require('./config/webpack.prod')({env: 'production'}) :
    require('./config/webpack.dev')({env: 'development'});