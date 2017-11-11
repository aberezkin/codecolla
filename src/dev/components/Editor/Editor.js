import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import PeerControl from '../Peers/Peer.js';
import ChangeEvent from './ChangeEvent';
import './Editor.styl';


window.peer = new PeerControl();
window.boolForOnChange = true;


function onCursorChange(selection, event) {
    console.log("E:", event);
    console.log("S:", selection);
    console.log('mouse', window.editor.editor.getCursorPosition());
}


class Editor extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this);
	}
    
	onChange(newValue, newEvent) {
		//console.log('!!!! ', newEvent);
		if (window.boolForOnChange) {
			let event = new ChangeEvent(newEvent);
			var eventStr = event.packEventOnChange();
			console.log('event', eventStr);

			window.peer.broadcastMessage(eventStr);
		} else {
			window.boolForOnChange = true;
		}
		this.props.onChange(newValue, newEvent);
		//const range = this.selection.getRange();
		//this.session.replace(range, text);
	}
	
    render() {
        //getMethods(this.aew);
        //console.log('mouse', this.refs.ace.editor);
        return (
            <AceEditor
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
            mode={this.props.mode}
            theme={this.props.theme}
            width={'100%'}
            height={'100%'}
            value={this.props.value}
            onChange={this.onChange}
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
    value: '//code is a new God',
};

export default Editor;
