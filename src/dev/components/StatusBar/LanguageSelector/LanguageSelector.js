import React, { Component } from 'react';
import './LanguageSelector.styl';
import ListSelector from '../../ListSelector/ListSelector'
import modes from '../../../HighLightLanguages'

class LanguageSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'LanguageSelector';
        this.options = modes;
        this.selectedOption = modes.findIndex((elem) => {return elem === "Text";});
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

LanguageSelector.defaultProps = {
    onChange: (event, key, value) => {
        console.log(this.name, event, key, value);
    },
};

export default LanguageSelector;