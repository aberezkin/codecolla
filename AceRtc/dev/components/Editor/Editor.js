import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import LanguageSelector from ''

import 'brace/mode/java';
import 'brace/theme/github';

function onChange(newValue) {
    console.log('change',newValue);
}

class Editor extends Component {
    // Render editor
    render() {
        return (
            <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            />
        );
    }
}

export default Editor;