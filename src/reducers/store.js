import { createStore, compose } from 'redux';
import reducer from './';
import middleware from '../middleware';

const configureStore = () => {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable no-underscore-dangle */
    const store = createStore(reducer, composeEnhancers(middleware));

    if (module.hot) module.hot.accept('./', () => store.replaceReducer(reducer));

    return store;
};

export default configureStore;
