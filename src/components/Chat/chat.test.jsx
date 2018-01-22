import React from 'react';
import Chat from './Chat';

const setup = (propOverrides) => {
    const props = {
        messages: [],
        onMessage: jest.fn(),
        isVisible: true,
        nickname: 'john',
        ...propOverrides,
    };

    const wrapper = shallow((<Chat {...props} />));

    return {
        props,
        wrapper,
        send: wrapper.find('.SendButton'),
    };
};

describe('chat component', () => {
    it('should render chat', () => {
        const messages = [
            { author: 'me', content: 'Hello!', date: new Date('2017-12-22T14:53:13.141Z') },
            { author: 'you', content: 'Hi!', date: new Date('2017-12-22T14:53:13.241Z') },
            { author: 'me', content: 'How are you?', date: new Date('2017-12-22T14:53:14.141Z') },
        ];

        const { wrapper } = setup({ messages });

        expect(wrapper).toMatchSnapshot();
    });

    it('should send message when textarea value is empty on send button click', () => {
        const { props, send } = setup();
        send.simulate('click');
        expect(props.onMessage).not.toHaveBeenCalled();
    });

    it('should  when send button clicked', () => {
        const { props, send, wrapper } = setup();

        wrapper.setState({ textareaValue: 'some message' });
        send.simulate('click');
        expect(props.onMessage).toHaveBeenCalled();
    });

    it('should not send message when textarea value is empty on ctrl+enter'); // TODO: implement
    it('should send message when textarea value is not empty on ctrl+enter'); // TODO: implement
});
