import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.bindCloseHandlers = this.bindCloseHandlers.bind(this);
        this.unbindCloseHandlers = this.unbindCloseHandlers.bind(this);
        this.unbindCloseHandlers = this.unbindCloseHandlers.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.state = { open: false };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.open && !prevState.open)
            this.bindCloseHandlers();
        else if (prevState.open && !this.state.open)
            this.unbindCloseHandlers();
    }

    componentWillUnmount() {
        this.unbindCloseHandlers();
    }

    onClick(event) {
        event.preventDefault();
        if (this.props.isTopLevel && !this.state.open)
            this.setState({ open: true });
        this.props.onSelect(this.props.command);
    }

    onMouseOver() {
        if (!this.props.isMenuBarActive)
            return;
        if (this.props.children !== undefined)
            this.setState({ open: true });
    }

    onMouseOut(event) {
        if (!this.props.isMenuBarActive)
            return;
        if (!ReactDOM.findDOMNode(this).contains(event.relatedTarget))
            this.setState({ open: false });
    }

    bindCloseHandlers() {
        document.addEventListener('click', this.onDocumentClick, false);
    }

    unbindCloseHandlers() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick() {
        this.setState({ open: false });
    }

    render() {
        return (
            <li className="MenuItem" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                <span className="title" onClick={this.onClick}>{this.props.title}</span>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </li>
        );
    }

    renderMenuItem(child) {
        if (this.state.open)
            return React.cloneElement(child, {
                isMenuBarActive: this.props.isMenuBarActive,
                onSelect: this.onSelect, // callback for all commands
            });
    }

    onSelect(command) {
        this.props.onSelect(command);
        this.setState({ open: false });
    }
}

MenuItem.defaultProps = {
    command: '',
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default MenuItem;
