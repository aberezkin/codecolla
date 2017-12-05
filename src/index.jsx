import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import App from './components/App' ;
import logger from "./middleware/logger";
import './index.styl';
import peersMiddleware from "./middleware/peer";

const store = createStore(reducers, applyMiddleware(peersMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />        
    </Provider>,
    document.getElementById('root')
);

