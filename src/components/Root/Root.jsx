import React from 'react';
import { Provider } from 'react-redux';
import Branching from '../Branching';

const Root = ({ store }) => (
    <Provider store={store}>
        <Branching />
    </Provider>
);

export default Root;
