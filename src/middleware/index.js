import peers from './peer';
import chat from './chat';
import text from './text';
import multi from 'redux-multi';
import {applyMiddleware} from "redux";

const middlewares = [peers, chat, text, multi];

if (process.env.NODE_ENV === 'development') {
    const logger = require('./logger').default;

    middlewares.push(logger);
}

export default applyMiddleware(...middlewares);
