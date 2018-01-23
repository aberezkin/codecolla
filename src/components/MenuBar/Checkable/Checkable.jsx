import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkable extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.state = { containerStyle: {} };
    }

    onClick(event) {
        event.preventDefault();
        this.setState({ containerStyle: {} });
        if (this.props.command !== '')
            this.props.onSelect(this.props.command);
    }

    onMouseOver() {
        this.setState({
            containerStyle: {
                backgroundColor: 'lightblue',
                color: 'white',
            },
        });
    }

    onMouseOut() {
        this.setState({ containerStyle: {} });
    }

    onSelect(command) {
        this.props.onSelect(command);
    }

    render() {
        return (
            <li className="Checkable">
                <span
                    tabIndex="0"
                    role="button"
                    className="container"
                    onClick={this.onClick}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    style={this.state.containerStyle}
                >
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        readOnly
                    />
                    <label>{this.props.label}</label>
                    <div className="hotkey" style={{display: (this.props.hotkey === '' ? 'none' : '')}}>
                        {this.props.hotkey.replace(/\b[a-z]/g,function(c){return c.toUpperCase();})}
                    </div>
                </span>
            </li>
        );
    }
}

Checkable.propTypes = {
    label: PropTypes.string.isRequired,
    command: PropTypes.string,
    onSelect: PropTypes.func,
    checked: PropTypes.bool,
    hotkey: PropTypes.string,
};

Checkable.defaultProps = {
    onSelect() {},
    command: '',
    checked: false,
    hotkey: '',
};

export default Checkable;
