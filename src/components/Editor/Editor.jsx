import React, { Component } from 'react';
import AceEditor from 'react-ace';
import ChangeEvent from '../../utilities/ChangeEvent';
import './Editor.styl';
import { generateCursorMarker } from '../../utilities/Helpers';

const EDIT_INSERT = 'insert';
const EDIT_REMOVE = 'remove';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.cursors = new Map();

        this.onChange = this.onChange.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onCursorChange = this.onCursorChange.bind(this);

        this.isCursorTransfer = true;
    }

    emitEditEvent(e) {
        if (e.action === EDIT_INSERT)
            this.props.onInsert(e);

        if (e.action === EDIT_REMOVE)
            this.props.onRemove(e);
    }

    onChange(newValue, newEvent) {
        this.emitEditEvent(ChangeEvent.getEditEvent(newEvent));
        if (this.props.onChange) this.props.onChange(newValue, newEvent);
    }

    onCursorChange() {
        // TODO: broadcast some kind of cursorChange action
    }

    onLoad(ed) {
        this.editor = ed;
        this.editor.session.setNewLineMode('unix');
        this.editor.selection.on('changeCursor', this.onCursorChange);
    }

    render() {
        return (
            <AceEditor
                onLoad={this.onLoad}
                mode={this.props.language}
                theme={this.props.theme}
                width={this.props.width}
                height={this.props.height}
                value={this.props.text}
                onChange={this.onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: 'Infinity' }}
            />
        );
    }
}

Editor.defaultProps = {
    mode: 'text',
    theme: 'github',
    value: '//code is a new God',
    width: '100%',
    height: '100%',
};

export default Editor;
