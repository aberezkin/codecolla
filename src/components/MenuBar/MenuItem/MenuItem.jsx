import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        this.state = {
            open: false,
            titleStyle: {},
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
        if (this.props.isTopLevel && !this.state.open)
            this.setState({
                open: true,
                titleStyle: {
                    backgroundColor: 'lightblue',
                    color: 'white',
                },
            });
        if (this.props.command !== '')
            this.props.onSelect(this.props.command);
    }

    onMouseOver() {
        if (!this.props.isMenuBarActive)
            return;
        this.setState({
            titleStyle: {
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
        this.setState({ titleStyle: {} });
        if (!this.node.contains(event.relatedTarget))
            this.setState({ open: false });
    }

    onDocumentClick() {
        this.setState({ open: false, titleStyle: {} });
    }

    onSelect(command) {
        this.props.onSelect(command);
        this.setState({ open: false, titleStyle: {} });
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
                onSelect: this.onSelect, // callback for all commands
            });

        return null;
    }

    render() {
        let length = React.Children.count(this.props.children);
        return (
            <li
                ref={(node) => { this.node = node; }}
                className={`MenuItem ${length > 0 ? 'submenu' : ''}`}
                onMouseOver={this.onMouseOver}
                onFocus={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onBlur={this.onMouseOut}
            >
                <span
                    tabIndex="0"
                    role="button"
                    className="title"
                    style={this.state.titleStyle}
                    onClick={this.onClick}
                >
                    {this.props.title}
                </span>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </li>
        );
    }
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    command: PropTypes.string,
    isTopLevel: PropTypes.bool,
    isMenuBarActive: PropTypes.bool,
    onSelect: PropTypes.func,
    children: PropTypes.node,
};

MenuItem.defaultProps = {
    isTopLevel: false,
    isMenuBarActive: false,
    onSelect() {},
    command: '',
    children: [],
};


export default MenuItem;
