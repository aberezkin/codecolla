import React from 'react';
import PropTypes from 'prop-types';
import './Message.styl';

const Message = ({ color, author, content, date }) => (
    <div className="Message">
        <div className="author" style={{ color }}>{author}</div>
        <div className="content">{content}</div>
        <div className="date">{date.toLocaleTimeString('en-US', { hour12: false })}</div>
    </div>
);

Message.propTypes = {
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    color: PropTypes.string,
};

Message.defaultProps = {
    color: 'black',
};

export default Message;
