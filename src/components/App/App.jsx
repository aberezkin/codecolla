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
import { HOME_PAGE_CLASSNAME } from '../HomePage/HomePage';
import Invite from '../Invite';
import SplitPane from 'react-split-pane';
import {TOGGLE_INVITE_MODAL} from "../../actions";

export const APP_CLASSNAME = 'App';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.resize = this.resize.bind(this);

        this.state = {
            wrapper: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 35}px`,
            },
            editor: {
                width: `${getPageWidth()}px`,
                height: `${getPageHeight() - 35}px`,
            },
        };

        window.addEventListener('resize', this.resize, true);
    }

    componentDidMount() {
        if (!this.props.isSessionActive) {
            this.sessionHandler(this.props.isSessionActive);
            this.resize();
            this.props.addHotKey('search', 'ctrl+f', (event) => {
                event.preventDefault();
                let editor = this.refs.editorWrapper.wrappedInstance.refs.editor.editor;
                editor.execCommand('find');
                return false;
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isStatusBarVisible !== this.props.isStatusBarVisible ||
            prevProps.isChatVisible !== this.props.isChatVisible)
            this.resize();
        if (!prevProps.isSessionActive)
            this.sessionHandler(prevProps.isSessionActive);
    }

    sessionHandler(prevSessionProp) {
        let reactEditor = this.refs.editorWrapper.wrappedInstance.refs.editor;
        if (!prevSessionProp && this.props.isSessionActive) {
            reactEditor.editor.focus();
            let line = reactEditor.editor.getSession().getValue().split("\n").length + 1;
            reactEditor.editor.gotoLine(line);
        } else if (!this.props.isSessionActive)
            document.querySelector(`.${HOME_PAGE_CLASSNAME}`).focus();
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
                <div className={`${APP_CLASSNAME} ace-${this.props.theme.replace(/_/g, '-')}`}>
                    <HomePage
                        style={{ display: (!this.props.isSessionActive) ? '' : 'none' }}
                    />
                    <Menu />
                    <div className="wrapper" style={this.state.wrapper}>
                        <SplitPane
                            split='vertical'
                            primary='second'
                            minSize={this.props.isChatVisible ? 320 : 0}
                            maxSize={this.props.isChatVisible ? 480 : 0}
                            style={{height: this.state.wrapper.height}}
                            onChange={size => this.setState({editor: {width: `${getPageWidth() - size}px`}})}
                        >
                            <Editor
                                ref="editorWrapper"
                                height={this.state.editor.height}
                                width={this.state.editor.width}
                            />
                            <Chat style={{ display: (this.props.isChatVisible) ? '' : 'none' }} />
                        </SplitPane>
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
    addHotKey: PropTypes.func.isRequired,
};