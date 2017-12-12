import peers from './peer';
import chat from './chat';
import text from './text';
import multi from 'redux-multi';
import logger from './logger';
import {applyMiddleware} from "redux";

export default applyMiddleware(peers, chat, text, multi, logger);
