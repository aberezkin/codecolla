import React from 'react';
import Message from './Message';

describe('message component', () => {
    it('should render message', () => {
        const wrapper = shallow((<Message author="me" content="Hello" date="'23:01:54'" />));

        expect(wrapper).toMatchSnapshot();
    });
});
