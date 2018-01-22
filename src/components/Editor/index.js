import { connect } from 'react-redux';
import { atomsToString } from '../../utilities/Helpers.js';
import { insertEvent, removeEvent, setIsTransferAllowed, moveCursor } from '../../actions/index';
import Editor from './Editor';

const mapStateToProps = state => ({
    text: atomsToString(state.text),
    isTransferAllowed: state.isTransferAllowed,
    theme: state.preferences.theme,
    language: state.preferences.editor.language,
    cursors: state.cursors,
    peerId: state.peers.id,
});

const mapDispatchToProps = dispatch => ({
    allowEventTransfer: flag => dispatch(setIsTransferAllowed(flag)),
    onInsert: e => dispatch(insertEvent(e)),
    onRemove: e => dispatch(removeEvent(e)),
    moveCursor: id => pos => dispatch(moveCursor(id, pos)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    peerId: undefined,
    moveCursor: dispatchProps.moveCursor(stateProps.peerId),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(Editor);
