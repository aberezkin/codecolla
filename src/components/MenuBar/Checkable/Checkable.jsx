import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkable extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.onSelect(this.props.command);
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
                >
                    {this.props.title}
                </span>
            </li>
        );
    }
}

Checkable.propTypes = {
    title: PropTypes.string.isRequired,
    command: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
};

Checkable.defaultTypes = {
    onSelect() {},
};

export default Checkable;
