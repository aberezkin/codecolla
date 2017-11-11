import React, { Component } from 'react';
import './ColorSchemeSelector.styl';
import ListSelector from '../../ListSelector/ListSelector';
import schemes from '../../../ColorSchemes';

class ColorSchemeSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'ColorSchemeSelector';
        this.options = schemes;
        this.selectedOption = this.options.findIndex((elem) => {return elem === props.selectedOption;});
    }
    render() {
        return (
            <ListSelector
                className={this.name}
                options={this.options}
                active={this.selectedOption}
                onChange={this.props.onChange}
                MarkSelected={true}
                textColor={this.props.textColor}
                backgroundColor={this.props.backgroundColor}
            />
        )
    }
}

ColorSchemeSelector.defaultProps = {
    selectedOption : 'github',
    onChange: (event, key, value) => {
        console.log(this.name, event, key, value);
    },
    textColor: 'black',
    backgroundColor: 'white',
};

export default ColorSchemeSelector;