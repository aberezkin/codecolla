import React from 'react';
import RouteConnector from './RouteConnector';

const setup = propOverrides => {
    const props = {
        id: 'random-id',
        isReady: false,
        connect: jest.fn(),
        ...propOverrides,
    };

    const wrapper = shallow(<RouteConnector {...props}/>);

    return {
        props,
        wrapper
    }
};

describe('route connector', () => {
    it('should render connecting message', () => {
        const {wrapper} = setup();

        expect(wrapper).toMatchSnapshot();
    });

    it('should render correct peer id', () => {
        const {wrapper} = setup({id: 'other-id'});

        expect(wrapper).toMatchSnapshot();
    });
});