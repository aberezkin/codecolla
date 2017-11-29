import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import App from './components/App/App' ;
import './index.styl';
import logger from "./middleware/logger";

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />        
    </Provider>,
    document.getElementById('root')
);

