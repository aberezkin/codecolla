import { connect } from 'react-redux';
import { insertEvent, removeEvent, setIsTransferAllowed } from '../../actions/index';
import Editor from './Editor';

const mapStateToProps = state => ({
    text: state.text.map(atom => atom.get('text'))
        .reduce((acc, line) => `${acc}\n${line}`),
    isTransferAllowed: state.isTransferAllowed,
    theme: state.preferences.theme,
    language: state.preferences.editor.language,
});

const mapDispatchToProps = dispatch => ({
    allowEventTransfer: flag => dispatch(setIsTransferAllowed(flag)),
    onInsert: e => dispatch(insertEvent(e)),
    onRemove: e => dispatch(removeEvent(e)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Editor);
