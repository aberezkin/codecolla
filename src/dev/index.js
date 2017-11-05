import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Editor/Editor' ;
import Btn from './components/Input/Button' ;
import './index.styl';

ReactDOM.render(
    <div>
        <App />
        <Btn />                  
    </div>,
    document.getElementById('root')
);