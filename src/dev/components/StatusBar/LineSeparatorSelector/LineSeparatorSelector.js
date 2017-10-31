import React, { Component } from 'react';
import './LineSeparatorSelector.styl';
import ListSelector from '../../ListSelector/ListSelector'


class LineSeparatorSelector extends Component {
    constructor(props) {
        super(props);
        this.name = 'LineSeparatorSelector';
        this.options = ['CRLF', 'LF', 'CR'];
        this.selectedOption = 1;
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

LineSeparatorSelector.defaultProps = {
    onChange: (event, key, value) => {
        console.log('LineSeparatorSelector', event, key, value);
    },
};

export default LineSeparatorSelector;