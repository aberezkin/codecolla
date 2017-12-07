import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashMap from 'lodash.map'
import './ListSelector.styl';

class ListSelector extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.state = {active: this.props.options[this.props.active]};
    }

    changeValue(event) {
        this.setState({active: this.props.options[event.target.value]});

        if (this.props.onChange) this.props.onChange(this.props.options[event.target.value]);
    }

    render() {
        return (
            <div className={`ListSelector ${this.props.className}`}>
                <span className="selected">{this.state.active}</span>
                <span className="pointer"
                      style={{borderTop: `.33em solid ${this.props.textColor}`}}
                />
                <select onChange={this.changeValue.bind(this)}
                        style={{
                            color: this.props.textColor,
                            backgroundColor: this.props.backgroundColor,
                        }}
                >
                    {
                        lodashMap(this.props.options, (value, key) => (<option value={key} key={key}>{value}</option>))
                    }
                </select>
            </div>
        )
    }
}

ListSelector.propTypes = {
    options:   PropTypes.array.isRequired, //all selectable options
    active:    PropTypes.any.isRequired,//selected option
    onChange:  PropTypes.func.isRequired,  //onChangeListener
};

ListSelector.defaultProps = {
    textColor: 'black',
    backgroundColor: 'white',
};

export default ListSelector;