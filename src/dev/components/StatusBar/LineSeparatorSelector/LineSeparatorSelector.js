import React, { Component } from 'react';
import './LineSeparatorSelector.styl';
import ListSelector from '../../ListSelector/ListSelector'


class LineSeparatorSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'LineSeparatorSelector';
        this.options = ['CRLF', 'LF', 'CR'];
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

LineSeparatorSelector.defaultProps = {
    selectedOption : 'LF',
    onChange: (event, key, value) => {
        console.log('LineSeparatorSelector', event, key, value);
    },
    textColor: 'black',
    backgroundColor: 'white',
};

export default LineSeparatorSelector;