import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {ADD_CURSOR, DELETE_CURSOR, MOVE_CURSOR} from '../../utilities/Peers/Peer.js';
import ChangeEvent from '../../utilities/Peers/ChangeEvent';
import CRDTControl from '../../utilities/CRDTControl.js';
import './Editor.styl';
import {generateCursorMarker} from "../../utilities/Helpers";

const { Range } = ace.acequire('ace/range');

class Editor extends Component {
    constructor(props) {
        super(props);

        this.cursors= new Map();

        this.onChange = this.onChange.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onCursorChange = this.onCursorChange.bind(this);

        this.addCursor = this.addCursor.bind(this);
        this.delCursor = this.delCursor.bind(this);
        this.moveCursor = this.moveCursor.bind(this);

        this.crdt = new CRDTControl();
        this.crdt.setIsPermissionToTransferFunc(this.props.setIsPermissionToTransfer);

        this.isCursorTransfer = true;
    }
    
	onChange(newValue, newEvent) {
        if (this.props.getIsPermissionToTransfer.call()) {
			console.log('ONCHANGE: ',this.props.getIsPermissiotToTransfer);
            let event = new ChangeEvent(newEvent);
			let eventStr = event.packEventOnChange();
            event = new ChangeEvent(eventStr);
            let e = event.unpackEvent();
            let msg = [];

            if (newEvent.action === 'insert') {
                msg = this.crdt.insert(e);
				console.log(msg);
                this.props.peerControl.broadcastMessage(msg);
            }

            if (newEvent.action === 'remove') {
                msg = this.crdt.remove(e);
                this.props.peerControl.broadcastMessage(msg);
            }
		}
		this.props.onChange(newValue, newEvent);
    }
    
    onCursorChange() {
        let pos = this.editor.getCursorPosition();
        let e = {
            pos: pos,
            peer: this.props.peerControl.ID
        };

        let event = new ChangeEvent(e);
        let eventStr = event.packEventMoveCursor();
        this.props.peerControl.broadcastMessage(eventStr);
    }
    
    onLoad(ed) {
        this.editor = ed;
		this.crdt.setEditor(ed);

        this.editor.session.setNewLineMode("unix");
        this.crdt.init();
        
        this.editor.selection.on('changeCursor', this.onCursorChange);
    }

    addCursor(peer, pos) {
        this.cursors.set(peer, generateCursorMarker(this.editor.session, pos).id);
    }

    delCursor(peer) {
        this.editor.session.removeMarker(this.cursors.get(peer));
        this.cursors.delete(peer);
    }

    moveCursor(peer, pos) {
        this.delCursor(peer);
        this.addCursor(peer, pos);
    }
	
	handleEvent(e) {
		console.log("Handling event: ", e);
		this.crdt.insertEvent(e);
	}
	
	handleCursorEvent(e) {
		console.log(e);
		switch (e.type) {
			case "ADD_CURSOR":
                this.addCursor(e.peerId, e.position);
                break;
			case "DELETE_CURSOR":
                this.delCursor(e.peerId);
                break;
			case "MOVE_CURSOR":
                this.moveCursor(e.peerId, e.position);
                break;
			default: return;
		}
	}

    render() {
        return (
            <AceEditor
                onLoad={this.onLoad}
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
