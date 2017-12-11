import React, {Component} from 'react';
import './SubMenu.styl';

export const SUB_MENU_CLASSNAME = 'SubMenu';

class SubMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={`${SUB_MENU_CLASSNAME}`}>
                <span className='label'>{this.props.label}</span>
                {this.props.children}
            </div>
        )
    }
}

SubMenu.defaultProps = {
    label: 'test',
};

export default SubMenu;