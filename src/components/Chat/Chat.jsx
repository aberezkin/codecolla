import React, {Component} from 'react';
import './Chat.styl';
import Message from './Message/Message';
import Textarea from 'react-textarea-autosize';

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

    sendMessage() {
        if (this.state.textareaValue === '') return;

        let elem = {
            author: 'test',
            content: this.state.textareaValue,
            date: (new Date()).toLocaleTimeString(),
        };

        this.setState({textareaValue : ''});

        this.props.onMessage(elem);
    }

    onKeyDown(event) {
        if (event.keyCode === 13 && event.ctrlKey && this.state.textareaValue !== '')
            this.sendMessage();
    }

    render() {
        return (
            <div className={`${CHAT_CLASSNAME}`} tabIndex="0"
                 style={{ display: (!this.props.isVisible) ? 'none' : '' }}>
                <div className="MessageBox">
                    {
                        this.props.messages.map((object, index) =>
                            (<Message
                                key={index}
                                author={object.author}
                                content={object.content}
                                date={object.date}/>))
                    }
                </div>
                <div className="InputBox">
                    <Textarea
                        className="InputArea"
                        placeholder={"Write your message..."}
                        value={this.state.textareaValue}
                        onChange={event => this.setState({textareaValue: event.target.value})}
                        onKeyDown={this.onKeyDown}
                        minRows={1}
                        maxRows={5}
                    />
                    <div className="SendButton" onClick={this.sendMessage}><span>\></span></div>
                </div>
            </div>
        );
    }
}

Chat.defaultProps = {
    messages: [],
    onMessage: (content) => {
        console.log(content);
    }

};

export default Chat;
