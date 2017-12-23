import { createStore, compose } from 'redux';
import reducer from './reducers';
import middleware from './middleware';

const configureStore = () => {
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable no-underscore-dangle */
    const store = createStore(reducer, composeEnhancers(middleware));

    if (module.hot) module.hot.accept('./reducers', () => store.replaceReducer(reducer));

    return store;
};

export default configureStore;
