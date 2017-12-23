import React from 'react';
import { MenuBar, MenuItem, SubMenu, Checkable } from '../MenuBar';

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

    it('should not call onSelect when click MenuItem without command', () => {
        const children = [<MenuItem title="Test" key={0} />];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .title').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not call onSelect when click Checkable without command', () => {
        const children = [
            <MenuItem title="Test" key={0}>
                <SubMenu>
                    <Checkable title="Checkable-test" />
                </SubMenu>
            </MenuItem>,
        ];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .title').simulate('click');
        wrapper.find('.Checkable .title').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call onSelect when click Checkable "test"', () => {
        const children = [
            <MenuItem title="Test" key={0}>
                <SubMenu>
                    <Checkable title="Checkable-test" command="check" />
                </SubMenu>
            </MenuItem>,
        ];

        const { onSelect, wrapper } = setup({ children });

        wrapper.find('.MenuItem .title').simulate('click');
        expect(onSelect).not.toHaveBeenCalled();

        wrapper.find('.Checkable .title').simulate('click');
        expect(onSelect).toHaveBeenCalled();
    });
});
