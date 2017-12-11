import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Message.styl';

class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Message">
                <div className="author" style={{color: this.props.color}}>{this.props.author}</div>
                <div className="content">{this.props.content}</div>
                <div className="date">{this.props.date}</div>
            </div>
        )
    }
}

Message.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

Message.defaultProps = {
    color: 'black',
};

export default Message;