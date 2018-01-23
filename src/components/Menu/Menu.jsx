import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuBar, Checkable, MenuItem, Separator, SubMenu } from '../MenuBar';
import {
    TOGGLE_STATUS_BAR,
    TOGGLE_CHAT,
    CREATE_NEW,
    OPEN_SMTH,
    OPEN_URL,
    SAVE_AS,
    SAVE_ALL,
    OPEN_SETTINGS,
    TOGGLE_INVITE_MODAL,
    COMPILE_CODE,
    TOGGLE_URL_MODAL,
} from '../../actions';
import './Menu.styl';

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    onMenuOptionHandler(command) {
        this.props.onMenuOptionHandler(command);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <MenuBar
                    onSelect={command => this.onMenuOptionHandler(command)}
                    style={this.props.style}
                >
                    <MenuItem label="File">
                        <SubMenu>
                            <MenuItem label="New" command={CREATE_NEW} />
                            <MenuItem label="Open..." command={OPEN_SMTH} />
                            <MenuItem label="Open URL" command={TOGGLE_URL_MODAL} />
                            <Separator />
                            <MenuItem label="Save as..." command={SAVE_AS} />
                            <MenuItem label="Save all" command={SAVE_ALL} />
                            <Separator />
                            <MenuItem label="Settings" command={OPEN_SETTINGS} />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Edit">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem label="View">
                        <SubMenu>
                            <MenuItem label="Tool Windows">
                                <SubMenu>
                                    <Checkable
                                        label="Chat"
                                        command={TOGGLE_CHAT}
                                        hotkey={this.props.hotKeysMap[TOGGLE_CHAT]}
                                        checked={this.props.isChatVisible}
                                    />
                                </SubMenu>
                            </MenuItem>
                            <Separator />
                            <Checkable
                                label="Status bar"
                                command={TOGGLE_STATUS_BAR}
                                hotkey={this.props.hotKeysMap[TOGGLE_STATUS_BAR]}
                                checked={this.props.isStatusBarVisible}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Navigate">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem label="Refactor">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem label="Tools">
                        <SubMenu>
                            <MenuItem
                                label="Invite a friend"
                                command={TOGGLE_INVITE_MODAL}
                                hotkey={this.props.hotKeysMap[TOGGLE_INVITE_MODAL]}
                            />
                            <MenuItem label="Compile" command={COMPILE_CODE} />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Help">
                        <SubMenu />
                    </MenuItem>
                </MenuBar>
            </div>
        );
    }
}

Menu.propTypes = {
    onMenuOptionHandler: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.string),
    isStatusBarVisible : PropTypes.bool.isRequired,
    isChatVisible: PropTypes.bool.isRequired,
    hotKeysMap: PropTypes.objectOf(PropTypes.string),
};

Menu.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
    hotKeysMap: {},
};

export default Menu;
