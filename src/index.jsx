import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from "./components/Root/Root";
import configureStore from "./reducers/store";

const store = configureStore();

const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component store={store}/>
        </AppContainer>,
        document.getElementById('root')
    )
};

render(Root);

if (module.hot) module.hot.accept('./components/Root/Root', () => { render(Root) });
