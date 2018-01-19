import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import { middleware as fetchMiddleware } from 'react-redux-fetch';
import peers from './peer';
import chat from './chat';
import text from './text';
import compileCode from './compile-code';

const middlewares = [
    fetchMiddleware, // it must be first!!!
    peers,
    chat,
    text,
    compileCode,
    multi, // it must be last!!!
];

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
