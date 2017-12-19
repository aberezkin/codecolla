import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "../../reducers/store";
import App from "../App";
import {BrowserRouter as Router, Route} from 'react-router-dom';

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

export default Root;
