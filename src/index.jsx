import React from 'react';
import ReactDom from 'react-dom';

import Root from "./components/Root";
import { AppContainer } from 'react-hot-loader';


const render = Component => {
    ReactDom.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
};

render(Root);

// ReactDom.render(<Root />, document.getElementById('root'));
if (module.hot) {
    module.hot.accept('./components/Root', () => { render(Root) })
}
