import { applyMiddleware } from 'redux';
import { middleware as fetchMiddleware } from 'react-redux-fetch';
import multi from 'redux-multi';
import peers from './peer';
import chat from './chat';
import text from './text';
import cursor from './cursor';
import compileCode from './compile-code';

const middlewares = [
    peers,
    chat,
    text,
    cursor,
    compileCode,
    fetchMiddleware,
    multi, // it must be last!!!
];


if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
