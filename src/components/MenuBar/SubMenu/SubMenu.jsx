import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const SUB_MENU_CLASSNAME = 'SubMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
    }

    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.props.isActive, // is MenuBar 'opened'
            isMenuItemRoot: false, // is element on top
            onSelect: this.props.onSelect, // callback for all commands
        });
    }

    render() {
        return (
            <ul className={`${SUB_MENU_CLASSNAME}`}>

                {React.Children.map(this.props.children, this.renderMenuItem)}
            </ul>
        );
    }
}

SubMenu.propTypes = {
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default SubMenu;
