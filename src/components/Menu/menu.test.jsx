import React from 'react';
import { MenuBar, MenuItem } from '../MenuBar';

const setup = (propChildren) => {
    const props = {
        children: [<MenuItem key={0} title="Test" command="test" />],
        onSelect: jest.fn(),
        ...propChildren,
    };

    const wrapper = mount((
        <MenuBar onSelect={props.onSelect}>
            {props.children}
        </MenuBar>
    ));

    return {
        onSelect: props.onSelect,
        wrapper,
    };
};

describe('menu component', () => {
    it('render MenuBar', () => {
        const { wrapper } = setup();

        expect(wrapper).toMatchSnapshot();
    });

    it('check rendering of MenuItem', () => {
        const { wrapper } = setup();

        expect(wrapper.contains([<MenuItem title="Test" command="test" />])).toBeTruthy();
    });

    it('should call onSelect when click MenuItem "test"', () => {
        const { onSelect, wrapper } = setup();

        wrapper.find('.MenuItem .title').simulate('click');
        expect(onSelect).toHaveBeenCalled();
    });
});
