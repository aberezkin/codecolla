import React, {Component} from 'react';
import AceEditor from 'react-ace';
import ChangeEvent, {ADD_CURSOR, DELETE_CURSOR, MOVE_CURSOR} from '../../utilities/Peers/ChangeEvent';
import CRDTControl from '../../utilities/CRDTControl.js';
import './Editor.styl';
import {generateCursorMarker} from "../../utilities/Helpers";
import {EDIT_INSERT, EDIT_REMOVE} from "../../utilities/Peers/Peer";

const { Range } = ace.acequire('ace/range');

class Editor extends Component {
    constructor(props) {
        super(props);
        this.cursors = new Map();

        this.onChange = this.onChange.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onCursorChange = this.onCursorChange.bind(this);

        this.addCursor = this.addCursor.bind(this);
        this.delCursor = this.delCursor.bind(this);
        this.moveCursor = this.moveCursor.bind(this);

        this.crdt = new CRDTControl();
        this.crdt.setIsTransferAllowed(this.props.allowEventTransfer);

        this.isCursorTransfer = true;
    }

    emitEditEvent(e) {
        if (e.action === EDIT_INSERT) {
            this.props.onInsert(e);
        }
        if (e.action === EDIT_REMOVE) {
            this.props.onRemove(e);
        }
    }
    
	onChange(newValue, newEvent) {
        this.emitEditEvent(ChangeEvent.getEditEvent(newEvent));
		if (this.props.onChange) this.props.onChange(newValue, newEvent);
    }

    onCursorChange() {
        // let pos = this.editor.getCursorPosition();
        // let e = {
        //     peer: this.props.peerControl.ID,
        //     pos: pos
        // };
        //
        // this.props.peerControl.broadcastEvent(ChangeEvent.getCursorMoveEvent(e));
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
		this.crdt.insertEvent(e);
	}
	
	handleCursorEvent(e) {
		switch (e.type) {
			case ADD_CURSOR:
                this.addCursor(e.peerId, e.position);
                break;
			case DELETE_CURSOR:
                this.delCursor(e.peerId);
                break;
			case MOVE_CURSOR:
                this.moveCursor(e.peerId, e.position);
                break;
			default: return;
		}
	}

    render() {
        return (
            <AceEditor
                onLoad={this.onLoad}
                mode={this.props.language}
                theme={this.props.theme}
                width={'100%'}
                height={'100%'}
                value={this.props.text}
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
    value: '//code is a new God',
};

export default Editor;
