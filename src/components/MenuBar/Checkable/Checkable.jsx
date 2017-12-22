import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkable extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.state = { title_style: {} };
    }

    onClick(event) {
        event.preventDefault();
        this.setState({ title_style: {} });
        this.props.onSelect(this.props.command);
    }

    onMouseOver() {
        this.setState({
            title_style: {
                backgroundColor: 'lightblue',
                color: 'white',
            },
        });
    }

    onMouseOut() {
        this.setState({ title_style: {} });
    }

    render() {
        return (
            <li className='Checkable'>
                <span className='title'
                      onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
                      style={this.state.title_style}>{this.props.title}</span>
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
