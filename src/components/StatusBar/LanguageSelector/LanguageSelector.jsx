import React, { Component } from 'react';
import './LanguageSelector.styl';
import ListSelector from '../../ListSelector/ListSelector';
import modes from '../../../utilities/HighlightLanguages';

class LanguageSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'LanguageSelector';
        this.options = modes;
        this.selectedOption = this.options.findIndex(elem => elem === props.selectedOption);
    }

    render() {
        return (
            <ListSelector
                options={this.options}
                active={this.selectedOption}
                onChange={this.props.onChange}
                textColor={this.props.textColor}
                backgroundColor={this.props.backgroundColor}
            />
        );
    }
}

LanguageSelector.defaultProps = {
    selectedOption: 'text',
    textColor: 'black',
    backgroundColor: 'white',
};

export default LanguageSelector;
