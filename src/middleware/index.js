import { applyMiddleware } from 'redux';
import multi from 'redux-multi';
import peers from './peer';
import chat from './chat';
import text from './text';

const middlewares = [peers, chat, text, multi];

if (process.env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
