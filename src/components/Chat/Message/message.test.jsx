import React from 'react';
import Message from './Message';

describe('message component', () => {
    it('should render message', () => {
        const wrapper = shallow((
            <Message
                author="me"
                content="Hello"
                date={new Date('2017-12-22T14:53:13.141Z')}
            />
        ));

        expect(wrapper).toMatchSnapshot();
    });
});
