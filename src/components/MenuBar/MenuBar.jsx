import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const MENU_BAR_CLASSNAME = 'MenuBar';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.bindSetInactiveHandler = this.bindSetInactiveHandler.bind(this);
        this.unbindSetInactiveHandler = this.unbindSetInactiveHandler.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.state = { isActive: false };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isActive && !prevState.isActive)
            this.bindSetInactiveHandler();
        else if (prevState.isActive && !this.state.isActive)
            this.unbindSetInactiveHandler();
    }

    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.state.isActive, //is MenuBar 'opened'
            isTopLevel: true, //is element on top
            onSelect: this.props.onSelect, //callback for all commands
        });
    }

    bindSetInactiveHandler() {
        document.addEventListener('click', this.handleDocumentClick, false);
    }

    unbindSetInactiveHandler() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    handleDocumentClick() {
        this.setState({ isActive: false });
    }

    onClick() {
        this.setState({ isActive: !this.state.isActive });
    }

    render() {
        return (
            <ul className={MENU_BAR_CLASSNAME} onClick={this.onClick}>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </ul>
        );
    }
}

MenuBar.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default MenuBar;
