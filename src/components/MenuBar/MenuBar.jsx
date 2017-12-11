import React, {Component} from 'react';
import './MenuBar.styl';

export const MENU_BAR_CLASSNAME = 'MenuBar';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.renderMenuItem = this.renderMenuItem.bind(this);
    }
    renderMenuItem(child) {
        return React.cloneElement(child, {});
    }
    render() {
        return (
            <div className={`${MENU_BAR_CLASSNAME}`}>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </div>
        )
    }
}

export default MenuBar;