import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import './Editor.styl';

import 'brace/mode/java';
import 'brace/theme/github';

function onChange(value) {
    console.log('change:\n', value);
}

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
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: 'Infinity'}}
            />
        );
    }
}

Editor.defaultProps = {
    mode : 'text',
    theme: 'github',
};

export default Editor;