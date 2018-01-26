import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.state = {
            open: false,
            containerStyle: {},
        };
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
        if (this.props.disabled)
            return false;
        if (this.props.isTopLevel && !this.state.open)
            this.setState({
                open: true,
                containerStyle: {
                    backgroundColor: 'lightblue',
                    color: 'white',
                },
            });
        if (this.props.command !== '')
            this.props.onSelect(this.props.command);
        return false;
    }

    onMouseOver() {
        if (!this.props.isMenuBarActive)
            return;
        if (this.props.disabled)
            return;
        this.setState({
            containerStyle: {
                backgroundColor: 'lightblue',
                color: 'white',
            },
        });
        if (this.props.children !== [])
            this.setState({ open: true });
    }

    onMouseOut(event) {
        if (!this.props.isMenuBarActive)
            return;
        this.setState({ containerStyle: {} });
        if (!this.node.contains(event.relatedTarget))
            this.setState({ open: false });
    }

    onDocumentClick() {
        this.setState({ open: false, containerStyle: {} });
    }

    onSelect(command) {
        this.props.onSelect(command);
        this.setState({ open: false, containerStyle: {} });
    }

    bindCloseHandlers() {
        document.addEventListener('click', this.onDocumentClick, false);
    }

    unbindCloseHandlers() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    renderMenuItem(child) {
        if (this.state.open)
            return React.cloneElement(child, {
                isMenuBarActive: this.props.isMenuBarActive,
                onSelect: command => this.onSelect(command), // callback for all commands
            });

        return null;
    }

    render() {
        const length = React.Children.count(this.props.children);
        return (
            <li
                ref={(node) => { this.node = node; }}
                className={`MenuItem${length > 0 ? ' submenu' : ''}`}
                onMouseOver={event => this.onMouseOver(event)}
                onFocus={event => this.onMouseOver(event)}
                onMouseOut={event => this.onMouseOut(event)}
                onBlur={event => this.onMouseOut(event)}
            >
                <span
                    tabIndex="0"
                    role="button"
                    className="container"
                    style={this.state.containerStyle}
                    onClick={event => this.onClick(event)}
                >
                    <div className="image"
                         style={{display: (this.props.isTopLevel ? 'none': ''), ...this.props.style}}
                    ></div>
                    <label className={this.props.disabled ? 'disabled' : ''}>{this.props.label}</label>
                    <div className="hotkey" style={{display: (this.props.hotkey === '' ? 'none' : '')}}>
                        {this.props.hotkey.replace(/\b[a-z]/g,function(c){return c.toUpperCase();})}
                    </div>
                </span>
                {React.Children.map(this.props.children, child => this.renderMenuItem(child))}
            </li>
        );
    }
}

MenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    command: PropTypes.string,
    isTopLevel: PropTypes.bool,
    isMenuBarActive: PropTypes.bool,
    onSelect: PropTypes.func,
    children: PropTypes.node,
    hotkey: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    disabled: PropTypes.bool,
};

MenuItem.defaultProps = {
    isTopLevel: false,
    isMenuBarActive: false,
    onSelect() {},
    command: '',
    hotkey: '',
    children: [],
    style: {},
    disabled: false,
};


export default MenuItem;
