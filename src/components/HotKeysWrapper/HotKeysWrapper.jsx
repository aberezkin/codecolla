import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {HotKeys} from 'react-hotkeys';
import App from '../App';
import {
    TOGGLE_CHAT,
    TOGGLE_STATUS_BAR,
    TOGGLE_INVITE_MODAL,
    TOGGLE_FULLSCREEN,
    TOGGLE_FULLSCREEN_SWITCH,
    COMPILE_CODE,
    OPEN_FILE,
    TOGGLE_URL_MODAL,
    TOGGLE_GIST_MODAL,
    SAVE_AS,
} from "../../actions";

export default class HotKeysWrapper extends Component {
    constructor(props) {
        super(props);
    }

    addHotKey(binding, command) {
        this.props.addHotKey(command, binding, (event) => {
            event.preventDefault();
            this.props.simpleAction(command);
        });
    }

    componentDidMount() {
        this.addHotKey('alt+1', TOGGLE_CHAT);
        this.addHotKey('alt+2', TOGGLE_STATUS_BAR);

        this.addHotKey('ctrl+o', OPEN_FILE);
        this.addHotKey('ctrl+shift+o', TOGGLE_URL_MODAL);
        this.addHotKey('ctrl+g', TOGGLE_GIST_MODAL);

        this.addHotKey('ctrl+s', SAVE_AS);

        this.addHotKey('ctrl+i', TOGGLE_INVITE_MODAL);
        this.addHotKey('ctrl+b', COMPILE_CODE);

        this.addHotKey('f11', TOGGLE_FULLSCREEN);

    }

    shouldComponentUpdate(nextProps) {
        return (this.props.hotKeysMap !== nextProps.hotKeysMap ||
            this.props.hotKeysHandlers !== nextProps.hotKeysHandlers
        );
    }

    render() {
        return (
            <HotKeys
                keyMap={this.props.hotKeysMap}
                handlers={this.props.hotKeysHandlers}
            >
                <App/>
            </HotKeys>
        )
    }
}

HotKeys.PropTypes = {
    hotKeysMap: PropTypes.objectOf(PropTypes.string),
    hotKeysHandlers: PropTypes.objectOf(PropTypes.func),
    addHotKey: PropTypes.func.isRequired,
    simpleAction: PropTypes.func.isRequired,
};

App.defaultProps = {
    hotKeysMap: {},
    hotKeysHandlers: {},
};