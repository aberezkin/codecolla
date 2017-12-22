import React from 'react';
import Message from './Message';

describe('message component', () => {
    it('should render message', () => {
        const wrapper = shallow((
            <Message
                author="me"
                content="Hello"
                date={new Date(1513954395141)}
            />
        ));

        expect(wrapper).toMatchSnapshot();
    });
});
