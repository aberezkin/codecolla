import { connect } from 'react-redux';
import HotKeysWrapper from './HotKeysWrapper';
import { addHotKey, createSimpleAction } from "../../actions";

const mapStateToProps = state => ({
    hotKeysMap: state.preferences.hotkeys.map,
    hotKeysHandlers: state.preferences.hotkeys.handlers,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    addHotKey: (name, hotkey, handler) => dispatch(addHotKey(name, hotkey, handler)),
    simpleAction: (command) => dispatch(createSimpleAction(command)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HotKeysWrapper);
