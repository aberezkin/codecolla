import React, { Component } from 'react';
import {getPageHeight} from "../../utilities/Helpers";
import Editor from '../Editor';
import StatusBar from '../StatusBar';
import Chat from '../Chat';
import '../../utilities/BraceConfigs';
import './App.styl';
import {STATUS_BAR_CLASSNAME} from "../StatusBar/StatusBar";
import {MENU_BAR_CLASSNAME} from "../MenuBar/MenuBar";
import Menu from "../Menu";

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
                height : getPageHeight() - 44 + 'px',
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
        let menuBar = document.querySelectorAll(`.${App.name()} .${MENU_BAR_CLASSNAME}`)[0];
        wrapper.style.height = `${getPageHeight() - statusBar.offsetHeight - menuBar.offsetHeight}px`;
    }
	
    render() {
        return (
            <div className={`${App.name()} ace-${this.props.theme}`}>
                <Menu style={this.style.menu} />
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
