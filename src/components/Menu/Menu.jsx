import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuBar, Checkable, MenuItem, Separator, SubMenu } from '../MenuBar';
import {
    SET_FILE,
    TOGGLE_STATUS_BAR,
    TOGGLE_CHAT,
    CREATE_NEW,
    OPEN_SMTH,
    OPEN_FILE,
    OPEN_URL,
    SAVE_AS,
    SAVE_ALL,
    OPEN_SETTINGS,
    TOGGLE_SEARCH_BOX,
    TOGGLE_INVITE_MODAL,
    COMPILE_CODE,
} from '../../actions';
import './Menu.styl';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.onMenuOptionHandler = this.onMenuOptionHandler.bind(this);
        this.onFileOpen = this.onFileOpen.bind(this);
    }

    onMenuOptionHandler(command) {
        if (command === TOGGLE_SEARCH_BOX)
            this.props.hotKeysHandlers[TOGGLE_SEARCH_BOX]();
        else
            this.props.onMenuOptionHandler(command);
    }

    onFileOpen(files) {
        this.props.onFileOpen(files);
    }

    render() {
        return (
            <div className="menu-wrapper">
                <input style={{display:'none'}} 
                    id="openFile" 
                    type="file" 
                    name="openFile" 
                    onChange={event => this.onFileOpen(event.target.files)}/>
                <MenuBar
                    onSelect={command => this.onMenuOptionHandler(command)}
                    style={this.props.style}
                >
                    <MenuItem label="File">
                        <SubMenu>
                            <MenuItem label="New" command={CREATE_NEW} />
                            <MenuItem title="Open file" command={OPEN_FILE} />
                            <MenuItem label="Open URL" command={OPEN_URL} />
                            <Separator />
                            <MenuItem label="Save as..." command={SAVE_AS} />
                            <MenuItem label="Save all" command={SAVE_ALL} />
                            <Separator />
                            <MenuItem label="Settings" command={OPEN_SETTINGS} />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Edit">
                        <SubMenu>
                            <MenuItem
                                label="Find"
                                command={TOGGLE_SEARCH_BOX}
                                hotkey={this.props.hotKeysMap[TOGGLE_SEARCH_BOX]}
                            />
                        </SubMenu>
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
    onFileOpen: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.string),
    isStatusBarVisible : PropTypes.bool.isRequired,
    isChatVisible: PropTypes.bool.isRequired,
    hotKeysMap: PropTypes.objectOf(PropTypes.string),
    hotKeysHandlers: PropTypes.objectOf(PropTypes.func),
};

Menu.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
    hotKeysMap: {},
    hotKeysHandlers: {},
};

export default Menu;
