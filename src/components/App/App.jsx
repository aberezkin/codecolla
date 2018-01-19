import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import HomePage from '../HomePage';
import Invite from '../Invite';

export const APP_CLASSNAME = 'App';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);

        this.state = {
            wrapper: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 40}px`,
            },
            editor: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 40}px`,
            },
        };

        window.addEventListener('resize', this.resize, true);
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
            <div>
                <HomePage style={{ display: (!this.props.isSessionActive) ? '' : 'none' }} />
                <div className={`${APP_CLASSNAME} ace-${this.props.theme.replace(/_/g, '-')}`}>
                    <Menu />
                    <div className="wrapper" style={this.state.wrapper}>
                        <Editor
                            ref={(editor) => { this.editorRef = editor; }}
                            height={this.state.editor.height}
                            width={this.state.editor.width}
                        />
                        <Chat style={{ display: (this.props.isChatVisible) ? '' : 'none' }} />
                    </div>
                    <StatusBar style={{ display: (this.props.isStatusBarVisible) ? '' : 'none' }} />
                </div>
                <Invite peerId="hello" />
            </div>
        );
    }
}

App.propTypes = {
    isStatusBarVisible: PropTypes.bool.isRequired,
    isChatVisible: PropTypes.bool.isRequired,
    isSessionActive: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
};
