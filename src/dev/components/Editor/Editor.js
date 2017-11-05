import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/github';

import PeerControl from '../Peers/Peer.js';
import ChangeEvent from './ChangeEvent';

window.peer = new PeerControl();
window.boolForOnChange = true;

function onChange(newValue, newEvent) {
    //console.log('!!!! ', newEvent);
    if (window.boolForOnChange) {
        let event = new ChangeEvent(newEvent);
        var eventStr = event.packEventOnChange();
        console.log('event', eventStr);

        window.peer.broadcastMessage(eventStr);
    } else {
        window.boolForOnChange = true;
    }
    //const range = this.selection.getRange();
    //this.session.replace(range, text);
}

function onCursorChange(selection, event) {
    console.log("E:", event);
    console.log("S:", selection);
    console.log('mouse', window.editor.editor.getCursorPosition());
}

class Editor extends Component {
    constructor() {
        super();
    }
    
    render() {
        //getMethods(this.aew);
        //console.log('mouse', this.refs.ace.editor);
        return (
            <AceEditor
            mode="java"
            theme="github"
            onChange={onChange}
            onCursorChange={onCursorChange}
            onLoad={(ed) => {
                window.editor = ed;
                window.editor.session.setNewLineMode("unix");
                //var cursorPosition = editor.getCursorPosition();
                //var cursorPosition = {row: 5, column: 5};
                //console.log('mouse', editor.session);
                
                //cursorPosition = editor.getCursorPosition();
                //window.editor.session.insert({row: 0, column: 0},"a");
                //editor.selection.moveTo(0, 0);
            }}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{$blockScrolling: true}}
            />
        );
    }
}


export default Editor;





