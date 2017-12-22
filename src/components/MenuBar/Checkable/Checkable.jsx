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

    render() {
        return (
            <li className='Checkable'>
                <span className='title' onClick={this.onClick}>{this.props.title}</span>
            </li>
        );
    }

    onSelect(command) {
        this.props.onSelect(command);
    }
}

Checkable.defaultProps = {
    command: '',
};

Checkable.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Checkable;
