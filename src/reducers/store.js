import reducer from './';
import middleware from '../middleware';
import {createStore, compose} from 'redux';

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(middleware));

    if (module.hot) module.hot.accept('./', () => store.replaceReducer(reducer));

    return store;
};

export default configureStore;
