import React, {Component} from 'react';
import './Chat.styl';
import Message from './Message/Message';
import Textarea from 'react-textarea-autosize';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = {
            value: '',
        };
    }
    static name() {
        return 'Chat';
    }
    sendMessage() {
        let elem = {
            author: 'test',
            content: this.state.value,
            date: (new Date()).toLocaleTimeString(),
        };
        this.setState({
            value : '',
        });
        this.props.onMessage(elem);
    }
    onKeyDown(event) {
        if (event.keyCode == 13 && event.ctrlKey) {
            if (this.state.value === '')
                return;
            this.sendMessage();
        }
    }
    render() {
        return (
            <div className={Chat.name()} onKeyDown={this.onKeyDown} tabIndex="0">
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
                        placeholder={"Write message..."}
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                        minRows={1}
                        maxRows={5}
                    />
                    <div className="SendButton" onClick={this.sendMessage}>\></div>
                </div>
            </div>
        )
    }
}

Chat.defaultProps = {
    messages: [],
    onMessage: (content) => {
        console.log(content);
    }

};

export default Chat;
