import React, { Component } from 'react';
import Editor from '../Editor/Editor';
import StatusBar from '../StatusBar/StatusBar';
import './App.styl';

import languages from '../../HighLightLanguages';
import themes from '../../ColorSchemes';

languages.forEach((lang) => {
    lang = lang.toLowerCase();
    require(`brace/mode/${lang}`);
    require(`brace/snippets/${lang}`);
});
themes.forEach((theme) => {
    require(`brace/theme/${theme}`);
});

function getPageHeight () {
    let body = document.body,
        html = document.documentElement;

    let result = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    console.log(result);
    return result;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'monokai',
            mode: 'java',
        };
        this.style = {
            statusBar : {
                width: '100%',
                height : '20px',
            },
            wrapper : {
                width: '100%',
                height : getPageHeight() - 20 + 'px',
            },
        };
        this.onChangeMode = this.onChangeMode.bind(this);
        this.onChangeTheme = this.onChangeTheme.bind(this);
    }
    static name() {
        return 'App';
    }
    static resize() {
        let wrapper = document.querySelectorAll('.'+App.name()+' .wrapper')[0];
        let statusBar = document.querySelectorAll('.'+App.name()+' .'+StatusBar.name())[0];
        wrapper.style.height = getPageHeight() - statusBar.offsetHeight + 'px';
    }
    onChangeMode(event, key, value) {
        console.log(value);
        this.setState({
            mode : value
        });
    }
    onChangeTheme(event, key, value) {
        console.log(value);
        this.setState({
            theme: value
        });
    }
    render() {
        return (
            <div className={App.name()}>
                <div className={'wrapper'} style={this.style.wrapper}>
                    <Editor
                        mode={this.state.mode}
                        theme={this.state.theme}
                    />
                </div>
                <StatusBar
                    style={this.style.statusBar}
                    valueTheme={this.state.theme}
                    valueLanguage={this.state.mode}
                    onChangeTheme={this.onChangeTheme}
                    onChangeLanguage={this.onChangeMode}
                />
            </div>
        )
    }
}

window.addEventListener('resize', App.resize, true);

export default App;