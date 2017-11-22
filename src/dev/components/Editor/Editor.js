import React, {Component} from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import PeerControl from '../Peers/Peer.js';
import ChangeEvent from './ChangeEvent';
import CRDTControl from '../CRDT/CRDTControl.js';
import CursorManager from '../Peers/CursorManager';
import './Editor.styl';

const { Range } = ace.acequire('ace/range');

window.peer = new PeerControl();
window.boolForOnChange = true;
window.checkbox = false;
window.crdt = new CRDTControl();
window.cursors = new CursorManager();

class Editor extends Component {
    constructor(props) {
        super(props);
		this.onChange = this.onChange.bind(this);
	}
    
	onChange(newValue, newEvent) {
		if (window.boolForOnChange) {
			let event = new ChangeEvent(newEvent);
			var eventStr = event.packEventOnChange();
			//console.log('event', eventStr);
            event = new ChangeEvent(eventStr);
            var e = event.unpackEvent();
            let msg = [];
            if (newEvent.action == 'insert') {
                msg = window.crdt.insert(e);
            }
            if (newEvent.action == 'remove') {
                msg = window.crdt.remove(e);
            }

			window.peer.broadcastMessage(msg);
		} else {
			//window.boolForOnChange = true;
		}
		this.props.onChange(newValue, newEvent);

        //console.log('__________________________');
        //for (var [key, value] of window.crdt.atoms) {
        //    console.log(key+' '+value.y+' : '+value.text+'\n');
        //}
	}
	
    render() {
        return (
            <AceEditor
            onLoad={(ed) => {
                window.editor = ed;
                window.editor.session.setNewLineMode("unix");

                window.crdt.init();
                console.log('__________________________');
                for (var [key, value] of window.crdt.atoms) {
                    console.log(key+' '+value.y+' : '+value.text+'\n');
                }
                
                //OnCursorChange
                window.editor.selection.on('changeCursor', function() {
                    let pos = window.editor.getCursorPosition();
                    console.log('mouse', window.peer.ID);

                    let e = {
                        pos: pos,
                        peer: window.peer.ID
                    }
                    let event = new ChangeEvent(e);
                    var eventStr = event.packEventMoveCursor();
                    window.peer.broadcastMessage(eventStr);
                });

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
