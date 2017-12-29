import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import peers from './peer';
import chat from './chat';
import text from './text';
import compileCode from './compile-code';
import {middleware as fetchMiddleware} from 'react-redux-fetch';

const middlewares = [peers, chat, text, multi, compileCode, fetchMiddleware];

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
