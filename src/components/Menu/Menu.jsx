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
    TOGGLE_GIST_MODAL,
    TOGGLE_ABOUT_MODAL,
    COMPILE_CODE,
    TOGGLE_FULLSCREEN,
    TOGGLE_URL_MODAL,
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
                            <MenuItem 
                                label="Open file" 
                                command={OPEN_FILE}
                                hotkey={this.props.hotKeysMap[OPEN_FILE]}
                            />
                            <MenuItem 
                                label="Open URL" 
                                command={TOGGLE_URL_MODAL} 
                                hotkey={this.props.hotKeysMap[TOGGLE_URL_MODAL]}
                            />
                            <MenuItem 
                                label="Open gist" 
                                command={TOGGLE_GIST_MODAL} 
                                hotkey={this.props.hotKeysMap[TOGGLE_GIST_MODAL]}
                            />
                            <Separator />
                            <MenuItem 
                                label="Save as..." 
                                command={SAVE_AS} 
                                hotkey={this.props.hotKeysMap[SAVE_AS]}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Edit">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem label="View">
                        <SubMenu>
                            <Checkable
                                label="Chat"
                                command={TOGGLE_CHAT}
                                hotkey={this.props.hotKeysMap[TOGGLE_CHAT]}
                                checked={this.props.isChatVisible}
                            />
                            <Checkable
                                label="Status bar"
                                command={TOGGLE_STATUS_BAR}
                                hotkey={this.props.hotKeysMap[TOGGLE_STATUS_BAR]}
                                checked={this.props.isStatusBarVisible}
                            />
                            <Separator />
                            <Checkable
                                label="Fullscreen"
                                command={TOGGLE_FULLSCREEN}
                                hotkey={this.props.hotKeysMap[TOGGLE_FULLSCREEN]}
                                checked={this.props.isFullscreen}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Navigate">
                        <SubMenu>
                            <MenuItem
                                label="Find"
                                command={TOGGLE_SEARCH_BOX}
                                hotkey={this.props.hotKeysMap[TOGGLE_SEARCH_BOX]}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Tools">
                        <SubMenu>
                            <MenuItem
                                label="Invite a friend"
                                command={TOGGLE_INVITE_MODAL}
                                hotkey={this.props.hotKeysMap[TOGGLE_INVITE_MODAL]}
                            />
                            <MenuItem
                                label="Compile" 
                                command={COMPILE_CODE} 
                                hotkey={this.props.hotKeysMap[COMPILE_CODE]}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem label="Help">
                        <SubMenu>
                            <MenuItem
                                label="About Codecolla"
                                command={TOGGLE_ABOUT_MODAL}
                            />
                        </SubMenu>
                    </MenuItem>
                </MenuBar>
            </div>
        );
    }
}

//<!-- <MenuItem title="Invite a friend" command={TOGGLE_INVITE_MODAL} />-->
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
