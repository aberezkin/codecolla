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
        this.props.onMenuOptionHandler(command);
    }

    onFileOpen(files) {
        console.log(files);
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
                <MenuBar onSelect={this.onMenuOptionHandler} style={this.props.style}>
                    <MenuItem title="File">
                        <SubMenu>
                            <MenuItem title="New" command={CREATE_NEW} />
                            <MenuItem title="Open file" command={OPEN_FILE} />
                            <MenuItem title="Open URL" command={OPEN_URL} />
                            <Separator />
                            <MenuItem title="Save as..." command={SAVE_AS} />
                            <MenuItem title="Save all" command={SAVE_ALL} />
                            <Separator />
                            <MenuItem title="Settings" command={OPEN_SETTINGS} />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem title="Edit">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem title="View">
                        <SubMenu>
                            <MenuItem title="Tool Windows">
                                <SubMenu>
                                    <Checkable
                                        title="Chat"
                                        command={TOGGLE_CHAT}
                                        checked={this.props.isChatVisible}
                                    />
                                </SubMenu>
                            </MenuItem>
                            <Separator />
                            <Checkable
                                title="Status bar"
                                command={TOGGLE_STATUS_BAR}
                                checked={this.props.isStatusBarVisible}
                            />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem title="Navigate">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem title="Refactor">
                        <SubMenu />
                    </MenuItem>
                    <MenuItem title="Tools">
                        <SubMenu>
                            <MenuItem title="Invite a friend" command={TOGGLE_INVITE_MODAL} />
                            <MenuItem title="Compile" command={COMPILE_CODE} />
                        </SubMenu>
                    </MenuItem>
                    <MenuItem title="Help">
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
};

Menu.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default Menu;
