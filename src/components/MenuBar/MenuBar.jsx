import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MENU_BAR_CLASSNAME = 'MenuBar';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.state = { isActive: false };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isActive && !prevState.isActive)
            this.bindSetInactiveHandler();
        else if (prevState.isActive && !this.state.isActive)
            this.unbindSetInactiveHandler();
    }

    onClick() {
        this.setState({ isActive: !this.state.isActive });
    }

    handleDocumentClick() {
        this.setState({ isActive: false });
    }

    bindSetInactiveHandler() {
        document.addEventListener('click', this.handleDocumentClick, false);
    }

    unbindSetInactiveHandler() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.state.isActive, // is MenuBar 'opened'
            isTopLevel: true, // is element on top
            onSelect: this.props.onSelect, // callback for all commands
        });
    }


    render() {
        return (
            <ul className={MENU_BAR_CLASSNAME}
                onClick={event => this.onClick(event)}
                role="menu"
                ref="menu"
            >
                {React.Children.map(this.props.children, child => this.renderMenuItem(child))}
            </ul>
        );
    }
}

MenuBar.propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func.isRequired,
};

MenuBar.defaultProps = {
    children: [],
};

export default MenuBar;
