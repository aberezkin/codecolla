import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashMap from 'lodash.map'
import './ListSelector.styl';

class ListSelector extends Component {
    constructor(props) {
        super(props);
        this.onChangeHandler= this.onChangeHandler.bind(this);
    }
    onChangeHandler(event) {
        let elem = document.querySelectorAll('.ListSelector.'+this.props.className)[0];
        elem.getElementsByTagName('span')[0].innerText = this.props.options[event.target.value];
        this.props.onChange(event, event.target.value, this.props.options[event.target.value]);
    }
    render() {
        this.onChange = this.props.onChange;
        return (
            <div className={'ListSelector ' + this.props.className}>
                <span className="selected">{this.props.options[this.props.active]}</span>
                <span className="pointer"
                      style={{borderTop: '.33em solid '+this.props.textColor}}
                ></span>
                <select onChange={this.onChangeHandler.bind(this)}
                        style={{
                            color: this.props.textColor,
                            backgroundColor: this.props.backgroundColor,
                        }}>
                    {lodashMap(this.props.options, (value, key) => {
                        return (<option value={key} key={key}>{value}</option>)
                    })}
                </select>
            </div>
        )
    }
}

ListSelector.propTypes = {
    className: PropTypes.string.isRequired,//class of menu
    options:   PropTypes.array.isRequired, //all selectable options
    active:    PropTypes.any.isRequired,//selected option
    onChange:  PropTypes.func.isRequired,  //onChangeListener
};

ListSelector.defaultProps = {
    textColor: 'black',
    backgroundColor: 'white',
};

export default ListSelector;