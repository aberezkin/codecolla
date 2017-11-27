import React, {Component} from 'react';
import AceEditor from 'react-ace';
import {ADD_CURSOR, DELETE_CURSOR, MOVE_CURSOR} from '../../utilities/Peers/Peer.js';
import ChangeEvent from '../../utilities/Peers/ChangeEvent';
import CRDTControl from '../../utilities/CRDTControl.js';
import './Editor.styl';

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
			console.log('ONCHANGE: ',this.props.getOnChangeStatus);
            let event = new ChangeEvent(newEvent);
			let eventStr = event.packEventOnChange();
            event = new ChangeEvent(eventStr);
            let e = event.unpackEvent();
            let msg = [];

            if (newEvent.action == 'insert') {
                msg = this.crdt.insert(e);
				console.log(msg);
                this.props.peerControl.broadcastMessage(msg);
            }

            if (newEvent.action == 'remove') {
                msg = this.crdt.remove(e);
                this.props.peerControl.broadcastMessage(msg);
            }

			//window.peer.broadcastMessage(msg);
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

        
        //window.editor = ed;
        this.editor.session.setNewLineMode("unix");
        console.log('!!!!',this.editor.getSession().getValue());
        this.crdt.init();
        
        //OnCursorChange
        this.editor.selection.on('changeCursor', this.onCursorChange);
    }

    addCursor(peer, pos) {
        let marker = {};
        marker.cursors = [pos];
        marker.update = function(html, markerLayer, session, config) {
            let start = config.firstRow, end = config.lastRow;

            for (let i = 0; i < this.cursors.length; i++) {
                let pos = this.cursors[i];

                if (pos.row < start) {
                    continue
                } else if (pos.row > end) {
                    break
                } else {
                    // compute cursor position on screen
                    // this code is based on ace/layer/marker.js
                    let screenPos = session.documentToScreenPosition(pos);
        
                    let height = config.lineHeight;
                    let width = config.characterWidth;
                    let top = markerLayer.$getTop(screenPos.row, config);
                    let left = markerLayer.$padding + screenPos.column * width;
                    // can add any html here
                    html.push(
                        `<div style='
                            position: absolute;
                            border-left: 2px solid gold;
                            height: ${height}px;
                            top: ${top}px;
                            left: ${left}px; 
                            width:${width}px'></div>`
                    );
                }
            }
        };
        marker.redraw = function() {
           this.session._signal("changeFrontMarker");
        };
        marker.addCursor = function() {
            marker.redraw();
        };
        marker.session = this.editor.session;
        marker.session.addDynamicMarker(marker, true);
        console.log('Cursor: ' + peer + ' ' + marker.id);
        this.cursors.set(peer, marker.id);
    }

    delCursor(peer) {
        console.log('__cursor: '+peer + ' ' + this.cursors.get(peer));
        this.editor.session.removeMarker(this.cursors.get(peer));
        this.cursors.delete(peer);
    }

    moveCursor(peer, pos) {
        console.log('cursor change!',this.isCursorTransfer);
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
