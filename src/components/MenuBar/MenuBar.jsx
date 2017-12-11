import React, {Component} from 'react';

export const MENU_BAR_CLASSNAME = 'MenuBar';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.state = {
            isActive: false,
        };
    }

    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.state.isActive, //is MenuBar 'opened'
            isMenuItemRoot: true,                 //is element on top
            onSelect: this.props.onSelect,        //callback forall commands
        });
    }

    render() {
        return (
            <ul className={`${MENU_BAR_CLASSNAME}`}>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </ul>
        )
    }
}

MenuBar.defaultProps = {
    onSelect: (command) => {
        console.log(command);
    },
};

export default MenuBar;