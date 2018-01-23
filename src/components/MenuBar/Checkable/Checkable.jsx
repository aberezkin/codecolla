import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkable extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.state = { titleStyle: {} };
    }

    onClick(event) {
        event.preventDefault();
        this.setState({ titleStyle: {} });
        if (this.props.command !== '')
            this.props.onSelect(this.props.command);
    }

    onMouseOver() {
        this.setState({
            titleStyle: {
                backgroundColor: 'lightblue',
                color: 'white',
            },
        });
    }

    onMouseOut() {
        this.setState({ titleStyle: {} });
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
                    className="title"
                    onClick={this.onClick}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    style={this.state.titleStyle}
                >
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        readOnly
                    />
                    <label>{this.props.title}</label>
                </span>
            </li>
        );
    }
}

Checkable.propTypes = {
    title: PropTypes.string.isRequired,
    command: PropTypes.string,
    onSelect: PropTypes.func,
    checked: PropTypes.bool,
};

Checkable.defaultProps = {
    onSelect() {},
    command: '',
    checked: false,
};

export default Checkable;
