import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import './Chat.styl';
import Message from './Message/Message';

export const CHAT_CLASSNAME = 'Chat';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {
            textareaValue: '',
        };
    }

    onKeyDown(event) {
        if (event.keyCode === 13 && event.ctrlKey && this.state.textareaValue !== '')
            this.sendMessage();
    }

    sendMessage() {
        if (this.state.textareaValue === '') return;

        const elem = {
            author: this.props.nickname,
            content: this.state.textareaValue,
            date: new Date(),
        };

        this.setState({ textareaValue: '' });

        this.props.onMessage(elem);
    }

    render() {
        return (
            <div className={CHAT_CLASSNAME} style={this.props.style}>
                <div className="MessageBox">
                    {
                        this.props.messages.map(message => (
                            <Message
                                key={message.date.getTime()}
                                author={message.author}
                                content={message.content}
                                date={message.date}
                            />
                        ))
                    }
                </div>
                <div className="InputBox">
                    <Textarea
                        className="InputArea"
                        placeholder="Write your message..."
                        value={this.state.textareaValue}
                        onChange={event => this.setState({ textareaValue: event.target.value })}
                        onKeyDown={this.onKeyDown}
                        minRows={1}
                        maxRows={5}
                        tabIndex="0"
                    />
                    <div
                        className="SendButton"
                        onClick={this.sendMessage}
                        onKeyDown={this.onKeyDown}
                        role="button"
                        tabIndex="0"
                    >
                        <span>\&gt;</span>
                    </div>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    style: PropTypes.objectOf(PropTypes.string),
    messages: PropTypes.arrayOf(PropTypes.object),
    onMessage: PropTypes.func,
    nickname: PropTypes.string.isRequired,
};

Chat.defaultProps = {
    style: {},
    messages: [],
    onMessage: () => { },
};

export default Chat;
