import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from "./components/Root/Root";


const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component/>
        </AppContainer>,
        document.getElementById('root')
    )
};

render(Root);

if (module.hot) module.hot.accept('./components/App', () => { render(Root) });
