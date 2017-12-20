import React from 'react';
import { Provider } from 'react-redux';
import configureStore from "../../reducers/store";
import Branching from "../Branching";

const store = configureStore();

const Root = () => (
    <Provider store={store}>
        <Branching/>
    </Provider>
);

export default Root;
