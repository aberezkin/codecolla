import React, {Component} from 'react';
import './MenuBar.styl';

export const MENU_BAR_CLASSNAME = 'MenuBar';

class MenuBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`${MENU_BAR_CLASSNAME}`} style={this.props.style}>
            </div>
        )
    }
}

MenuBar.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default MenuBar;