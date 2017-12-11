import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.renderMenuItem = this.renderMenuItem.bind(this);
    }
    onClick(event) {
        this.props.onSelect(this.props.command);
    }
    renderMenuItem(child) {
        return React.cloneElement(child, {
            isMenuBarActive: this.props.isActive, //is MenuBar 'opened'
            isMenuItemRoot: false,                 //is element on top
            onSelect: this.props.onSelect,        //callback forall commands
        });
    }
    render() {
        return (
            <li className='MenuItem'>
                <span className='title' onClick={this.onClick}>{this.props.title}</span>
                {React.Children.map(this.props.children, this.renderMenuItem)}
            </li>
        )
    }
}

MenuItem.defaultProps = {
    command: '',
};

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
};

export default MenuItem;