import React, {Component} from 'react';
import {MenuBar, Checkable, MenuItem, Separator, SubMenu} from '../MenuBar';

import './Menu.styl';

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MenuBar style={this.props.style}>
                <SubMenu label='View'>
                </SubMenu>
            </MenuBar>
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