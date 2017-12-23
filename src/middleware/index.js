import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import peers from './peer';
import chat from './chat';
import text from './text';
import cursor from './cursor';

const middlewares = [peers, chat, text, cursor, multi];

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
