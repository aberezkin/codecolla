import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Branching from '../Branching';

const Root = ({ store }) => (
    <Provider store={store}>
        <Branching />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({
        getState: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
    }).isRequired,
};

export default Root;
