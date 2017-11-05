import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import './Editor.styl';

import 'brace/mode/java';
import 'brace/theme/github';

class Editor extends Component {
    constructor(props) {
        super(props);
    }
    // Render editor
    render() {
        return (
            <AceEditor
            mode={this.props.mode}
            theme={this.props.theme}
            width={'100%'}
            height={'100%'}
            value={this.props.value}
            onChange={this.props.onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: 'Infinity'}}
            />
        );
    }
}

Editor.defaultProps = {
    mode : 'text',
    theme: 'github',
    onChange: (value) => {
        console.log('change:\n', value);
    },
    value: '//code is new god',
};

export default Editor;