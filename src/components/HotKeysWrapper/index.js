import { connect } from 'react-redux';
import HotKeysWrapper from './HotKeysWrapper';
import {addHotKey, createSimpleAction} from "../../actions";

const mapStateToProps = state => ({
    hotKeysMap: state.preferences.hotkeys.map,
    hotKeysHandlers: state.preferences.hotkeys.handlers,
});

const mapDispatchToProps = dispatch => ({
    addHotKey: (command, hotkey, handler) => dispatch(addHotKey(command, hotkey, handler)),
    simpleAction: command => dispatch(createSimpleAction(command)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotKeysWrapper);
