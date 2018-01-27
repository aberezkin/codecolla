import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import { middleware as fetchMiddleware } from 'react-redux-fetch';
import peers from './peer';
import chat from './chat';
import text from './text';
import cursor from './cursor';
import compileCode from './compile-code';
import copypaste from './coypaste'

const middlewares = [
    fetchMiddleware, // it must be first!!!
    peers,
    chat,
    text,
    cursor,
    compileCode,
    copypaste,
    multi, // it must be last!!!
];


if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
