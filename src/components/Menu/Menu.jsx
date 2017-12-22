import React, { Component } from 'react';
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
} from '../../actions';
import './Menu.styl';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.onMenuOptionHandler = this.onMenuOptionHandler.bind(this);
    }

    onMenuOptionHandler(command) {
        if (command === '')
            return;
        this.props.onMenuOptionHandler(command);
    }

    render() {
        return (
            <div className={'menu-wrapper'}>
                <MenuBar onSelect={this.onMenuOptionHandler} style={this.props.style}>
                    <MenuItem  title={'File'}>
                        <SubMenu>
                            <MenuItem title={'New'} command={CREATE_NEW}/>
                            <MenuItem title={'Open...'} command={OPEN_SMTH}/>
                            <MenuItem title={'Open URL'} command={OPEN_URL}/>
                            <Separator />
                            <MenuItem title={'Save as...'} command={SAVE_AS}/>
                            <MenuItem title={'Save all'} command={SAVE_ALL}/>
                            <Separator />
                            <MenuItem title={'Settings'} command={OPEN_SETTINGS}/>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Edit'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'View'}>
                        <SubMenu>
                            <Checkable title={'Status bar'} command={TOGGLE_STATUS_BAR}/>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Navigate'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Refactor'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Tools'}>
                        <SubMenu>
                            <MenuItem title={'Chat'} command={TOGGLE_CHAT}/>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Help'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                </MenuBar>
            </div>
        );
    }
}

Menu.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default Menu;
