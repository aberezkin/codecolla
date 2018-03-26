import React from 'react';
import { MenuBar, MenuItem, SubMenu, Checkable } from '../MenuBar';

const setup = (propChildren) => {
    const props = {
        children: [<MenuItem key={0} label="Test" command="test" />],
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

    it('should call onSelect when click MenuItem "test"', () => {
        const { onSelect, wrapper } = setup();

        wrapper.find('.MenuItem .container').simulate('click');
        expect(onSelect).toHaveBeenCalled();
    });

    it('should not call onSelect when click MenuItem without command', () => {
        const children = [<MenuItem label="Test" key={0} />];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .container').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not call onSelect when click Checkable without command', () => {
        const children = [
            <MenuItem label="Test" key={0}>
                <SubMenu>
                    <Checkable label="Checkable-test" />
                </SubMenu>
            </MenuItem>,
        ];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .container').simulate('click');
        wrapper.find('.Checkable .container').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call onSelect when click Checkable "test"', () => {
        const children = [
            <MenuItem label="Test" key={0}>
                <SubMenu>
                    <Checkable label="Checkable-test" command="check" />
                </SubMenu>
            </MenuItem>,
        ];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .container').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();

        wrapper.find('.Checkable .container').simulate('click');
        expect(onSelect).toHaveBeenCalled();
    });
});
