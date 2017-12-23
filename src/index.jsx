import React from 'react';

import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store';

const store = configureStore();

const render = Component => ReactDom.render(
    <AppContainer>
        <Provider store={store}>
            <Component />
        </Provider>
    </AppContainer>,
    document.getElementById('root'),
);

render(App);

if (module.hot) module.hot.accept('./components/App', () => { render(App); });
