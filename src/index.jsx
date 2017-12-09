import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import App from './components/App' ;
import logger from "./middleware/logger";
import './index.styl';
import peersMiddleware from "./middleware/peer";
import cursor from './middleware/cursor';
import multi from 'redux-multi';
import text from './middleware/text';

const store = createStore(reducers, applyMiddleware(peersMiddleware, text, multi, cursor, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />        
    </Provider>,
    document.getElementById('root')
);

