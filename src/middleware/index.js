import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import { middleware as fetchMiddleware } from 'react-redux-fetch';
import peers from './peer';
import chat from './chat';
import text from './text';
import cursor from './cursor';
import stepBack from './stepBackShortcut';
import compileCode from './compile-code';
import gistGetter from './gist-getter';
import fullscreen from './fullscreen';

const middlewares = [
    fetchMiddleware, // it must be first!!!
    peers,
    chat,
    text,
    cursor,
    compileCode,
    stepBack,
    gistGetter,
    fullscreen,
    multi, // it must be last!!!
];


if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
