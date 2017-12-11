import React, {Component} from 'react';
import {MenuBar, Checkable, MenuItem, Separator, SubMenu} from '../MenuBar';

import './Menu.styl';

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'menu-wrapper'}>
                <MenuBar style={this.props.style}>
                    <MenuItem  title={'File'} command={'menu-file'}>
                        <SubMenu>
                            <MenuItem title={'New'} command={'menu-new'}/>
                            <MenuItem title={'Open...'} command={'menu-open'}/>
                            <MenuItem title={'Open URL'} command={'menu-open-url'}/>
                            <MenuItem title={'Save as...'} command={'menu-save-as'}/>
                            <MenuItem title={'Settings'} command={'menu-settings'}/>
                            <MenuItem title={'Save all'} command={'menu-save-all'}/>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Edit'} command={'menu-edit'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'View'} command={'menu-view'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Navigate'} command={'menu-navigate'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Refactor'} command={'menu-refactor'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Tools'} command={'menu-tools'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                    <MenuItem  title={'Help'} command={'menu-help'}>
                        <SubMenu>
                        </SubMenu>
                    </MenuItem>
                </MenuBar>
            </div>
        )
    }
}


Menu.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default Menu;