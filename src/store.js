import reducer from './reducers';
import middleware from './middleware';
import {createStore, compose} from 'redux';

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(middleware));

    if (module.hot) module.hot.accept('./reducers', () => store.replaceReducer(reducer));

    return store;
};

export default configureStore;
