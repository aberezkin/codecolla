import React, { Component } from 'react';
import {getPageHeight} from "../../utilities/Helpers";
import Editor from '../Editor';
import StatusBar from '../StatusBar';
import Chat from '../Chat';
import '../../utilities/BraceConfigs';
import './App.styl';
import {STATUS_BAR_CLASSNAME} from "../StatusBar/StatusBar";

const defaultValue =
`function hello() {
    console.log('Hello, World!');
}`;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.style = {
            wrapper : {
                width: '100%',
                height : getPageHeight() - 20 + 'px',
            },
        };

        this.props.initPeer();
        this.props.setText(defaultValue);
    }

    static name() {
        return 'App';
    }

    static resize() {
        let wrapper = document.querySelectorAll(`.${App.name()} .wrapper`)[0];
        let statusBar = document.querySelectorAll(`.${App.name()} .${STATUS_BAR_CLASSNAME}`)[0];
        wrapper.style.height = `${getPageHeight() - statusBar.offsetHeight}px`;
    }
	
    render() {
        return (
            <div className={App.name()}>
                <div className={'wrapper'} style={this.style.wrapper}>
                    <Editor ref={(editor) => { this.editorRef = editor; }}/>
                    <Chat/>
                </div>
                <StatusBar style={this.style.statusBar} />
            </div>
        )
    }
}

window.addEventListener('resize', App.resize, true);
