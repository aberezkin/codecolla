import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SUB_MENU_CLASSNAME = 'SubMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);
    }

    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.props.isMenuBarActive, // is MenuBar 'opened'
            isMenuItemRoot: false, // is element on top
            onSelect: this.props.onSelect, // callback for all commands
        });
    }

    render() {
        return (
            <ul className={`${SUB_MENU_CLASSNAME}`}>
                {React.Children.map(this.props.children, child => this.renderMenuItem(child))}
            </ul>
        );
    }
}

SubMenu.propTypes = {
    children: PropTypes.node,
    isMenuBarActive: PropTypes.bool,
    onSelect: PropTypes.func,
};

SubMenu.defaultProps = {
    isMenuBarActive: false,
    onSelect() {},
    children: [],
};

export default SubMenu;
