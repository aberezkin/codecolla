import React, { Component } from 'react';
import './ColorSchemeSelector.styl';
import ListSelector from '../../ListSelector/ListSelector';
import schemes from '../../../ColorSchemes';

class ColorSchemeSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'ColorSchemeSelector';
        this.options = schemes;
        this.selectedOption = schemes.findIndex((elem) => {return elem === "github";});;
    }
    render() {
        return (
            <ListSelector
                className={this.name}
                options={this.options}
                active={this.selectedOption}
                onChange={this.props.onChange}
                MarkSelected={true}
            />
        )
    }
}

ColorSchemeSelector.defaultProps = {
    onChange: (event, key, value) => {
        console.log(this.name, event, key, value);
    },
};

export default ColorSchemeSelector;