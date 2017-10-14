import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

function onChange(newValue) {
    console.log('change',newValue);
}
ReactDOM.render(
    <AceEditor
        mode="java"
        theme="github"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
    />,
    document.getElementById('root')
);