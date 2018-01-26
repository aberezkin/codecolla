import { connect } from 'react-redux';
import App from './App';
import { addHotKey, isFullMode } from "../../actions";

const mapStateToProps = state => ({
    theme: state.preferences.theme,
    isStatusBarVisible: state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    isSessionActive: state.preferences.isSessionActive,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    addHotKey: (name, hotkey, handler) => dispatch(addHotKey(name, hotkey, handler)),
    isFullMode: (fs) => dispatch(isFullMode(fs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
