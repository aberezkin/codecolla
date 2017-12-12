import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import multi from 'redux-multi';
import App from './App' ;
import reducers from '../reducers';
import logger from "../middleware/logger";
import peersMiddleware from "../middleware/peer";
import text from '../middleware/text';
import chat from '../middleware/chat';
import '../index.styl';

const store = createStore(reducers, applyMiddleware(peersMiddleware, text, chat, multi, logger));


const Root = props => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default Root;
