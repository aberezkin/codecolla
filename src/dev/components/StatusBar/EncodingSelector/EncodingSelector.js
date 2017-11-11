import React, { Component } from 'react';
import './EncodingSelector.styl';
import ListSelector from '../../ListSelector/ListSelector'


class EncodingSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'EncodingSelector';
        this.options = ['UTF-8', 'CP-866', 'CP-1255'];
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

EncodingSelector.defaultProps = {
    selectedOption : 'UTF-8',
    onChange: (event, key, value) => {
        console.log('EncodingSelector', event, key, value);
    },
    textColor: 'black',
    backgroundColor: 'white',
};

export default EncodingSelector;