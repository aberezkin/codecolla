import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CursorPosition extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CursorPosition">
                <span className="Position">
                    {' Line '}
                    {this.props.position && this.props.position.row+1}
                    {', Column '}
                    {this.props.position && this.props.position.column+1}
                </span>
            </div>
        );
    }
}

CursorPosition.propTypes = {
    textColor: PropTypes.string,
};

CursorPosition.defaultProps = {
    textColor: 'black',
};

export default CursorPosition;
