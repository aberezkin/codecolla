import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {HotKeys} from 'react-hotkeys';
import App from '../App';
import {
    TOGGLE_CHAT,
    TOGGLE_INVITE_MODAL,
    TOGGLE_FULLSCREEN,
} from "../../actions";

export default class HotKeysWrapper extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.addHotKey(TOGGLE_CHAT, 'alt+1', (event) => {
            event.preventDefault();
            console.log('toggle chat');
            this.props.simpleAction(TOGGLE_CHAT);
        });

        this.props.addHotKey(TOGGLE_INVITE_MODAL, 'ctrl+i', (event) => {
            event.preventDefault();
            this.props.simpleAction(TOGGLE_INVITE_MODAL);
        });

        this.props.addHotKey(TOGGLE_INVITE_MODAL, 'f11', (event) => {
            event.preventDefault();
            this.props.simpleAction(TOGGLE_FULLSCREEN);
        });
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