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

    render() {
        return (
            <li className='Checkable'>
                <span
                    className='title'
                    onClick={this.onClick}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    style={this.state.titleStyle}
                >{this.props.title}</span>
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
