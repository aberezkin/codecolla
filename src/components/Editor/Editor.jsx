import React, {Component} from 'react';
import AceEditor from 'react-ace';
import ChangeEvent from '../../utilities/ChangeEvent';
import './Editor.styl';
import {generateCursorMarker} from "../../utilities/Helpers";

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

    componentDidMount() {
        this.setState({markerIds: []});
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
        this.props.moveCursor(this.editor.getCursorPosition());
    }

    onLoad(ed) {
        this.editor = ed;
        this.editor.session.setNewLineMode("unix");
        this.editor.selection.on('changeCursor', this.onCursorChange);
    }

    componentWillReceiveProps({cursors}) {
        if (this.props.cursors != cursors) {
            this.state.markerIds.forEach(cursor => this.editor.session.removeMarker(cursor));
            this.setState({markerIds: cursors.map(cursor => generateCursorMarker(this.editor.session, cursor).id)});
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
                commands={[{   
                  name: 'commandCtrlZ',
                  bindKey: {win: 'Ctrl-z', mac: 'Command-z', linux: 'Ctrl-z'},
                  exec: () => { console.log('Ctrl-z')} 
                }]}
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
