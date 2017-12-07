import React, { Component } from 'react';
import './LinefeedSelector.styl';
import ListSelector from '../../ListSelector/ListSelector'


class LinefeedSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'LinefeedSelector';
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
                textColor={this.props.textColor}
                backgroundColor={this.props.backgroundColor}
            />
        )
    }
}

LinefeedSelector.defaultProps = {
    selectedOption : 'LF',
    textColor: 'black',
    backgroundColor: 'white',
};

export default LinefeedSelector;