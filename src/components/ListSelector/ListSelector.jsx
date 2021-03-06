import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashMap from 'lodash.map';
import './ListSelector.styl';

class ListSelector extends Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.onChange(this.props.options[event.target.value]);
    }

    render() {
        return (
            <div className="ListSelector">
                <span className="selected">{this.props.active}</span>

                <span
                    className="pointer"
                    style={{ borderTop: `.33em solid ${this.props.textColor}` }}
                />
                <select onChange={this.changeValue}>
                    {
                        lodashMap(
                            this.props.options,
                            (value, key) => (<option value={key} key={key}>{value}</option>),
                        )
                    }
                </select>
            </div>
        );
    }
}

ListSelector.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired, // all selectable options
    active: PropTypes.string.isRequired, // selected option
    onChange: PropTypes.func.isRequired, // onChangeListener
    textColor: PropTypes.string,
};

ListSelector.defaultProps = {
    textColor: 'black',
};

export default ListSelector;
