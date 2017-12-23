import React, { Component } from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import ChangeEvent from '../../utilities/ChangeEvent';
import './Editor.styl';

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

    onChange(newValue, newEvent) {
        this.emitEditEvent(ChangeEvent.getEditEvent(newEvent));
    }

    // eslint-disable-next-line class-methods-use-this
    onCursorChange() {
        // TODO: broadcast some kind of cursorChange action
    }

    onLoad(ed) {
        this.editor = ed;
        this.editor.session.setNewLineMode('unix');
        this.editor.selection.on('changeCursor', this.onCursorChange);
    }

    emitEditEvent(e) {
        if (e.action === EDIT_INSERT)
            this.props.onInsert(e);

        if (e.action === EDIT_REMOVE)
            this.props.onRemove(e);
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

Editor.propTypes = {
    onInsert: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    language: PropTypes.string,
    theme: PropTypes.string,
    text: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

Editor.defaultProps = {
    language: 'text',
    theme: 'github',
    text: '//code is a new God',
    width: '100%',
    height: '100%',
};

export default Editor;
