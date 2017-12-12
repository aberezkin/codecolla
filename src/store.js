import reducer from './reducers';
import middleware from './middleware';
import {createStore} from 'redux';

const configureStore = () => {
    const store = createStore(reducer, middleware);

    if (module.hot) module.hot.accept('./reducers', () => store.replaceReducer(reducer));

    return store;
};

export default configureStore;
