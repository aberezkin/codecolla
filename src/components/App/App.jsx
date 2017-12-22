import React, { Component } from 'react';
import { getPageHeight, getPageWidth } from '../../utilities/Helpers';
import Editor from '../Editor';
import StatusBar from '../StatusBar';
import Chat from '../Chat';
import '../../utilities/BraceConfigs';
import './App.styl';
import { STATUS_BAR_CLASSNAME } from '../StatusBar/StatusBar';
import { MENU_BAR_CLASSNAME } from '../MenuBar/MenuBar';
import Menu from '../Menu';
import { CHAT_CLASSNAME } from '../Chat/Chat';

const defaultValue =
`function hello() {
    console.log('Hello, World!');
}`;

export const APP_CLASSNAME = 'App';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);

        this.state = {
            wrapper: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 42}px`,
            },
            editor: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 42}px`,
            },
        };

        window.addEventListener('resize', this.resize, true);

        this.props.initPeer();
        this.props.setText(defaultValue);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isStatusBarVisible !== this.props.isStatusBarVisible ||
            prevProps.isChatVisible !== this.props.isChatVisible)
            this.resize();
    }

    resize() {
        const statusBar = document.querySelector(`.${APP_CLASSNAME} .${STATUS_BAR_CLASSNAME}`);
        const menuBar = document.querySelector(`.${APP_CLASSNAME} .${MENU_BAR_CLASSNAME}`);
        const chat = document.querySelector(`.${APP_CLASSNAME} .${CHAT_CLASSNAME}`);

        this.setState({
            wrapper: {
                height: `${getPageHeight() - statusBar.offsetHeight - menuBar.offsetHeight - 1}px`,
                width: `${getPageWidth()}px`,
            },
            editor: {
                height: `${getPageHeight() - statusBar.offsetHeight - menuBar.offsetHeight - 1}px`,
                width: `${getPageWidth() - chat.offsetWidth}px`,
            },
        });
    }
	
    render() {
        return (
            <div className={`${APP_CLASSNAME} ace-${this.props.theme.replace(/_/g, '-')}`}>
                <Menu />
                <div className={'wrapper'} style={this.state.wrapper}>
                    <Editor ref={(editor) => { this.editorRef = editor; }}
                            height={this.state.editor.height}
                            width={this.state.editor.width}/>
                    <Chat />
                </div>
                <StatusBar />
            </div>
        );
    }
}
