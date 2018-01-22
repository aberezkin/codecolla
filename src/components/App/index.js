import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
    theme: state.preferences.theme,
    isStatusBarVisible: state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    isSessionActive: state.preferences.isSessionActive,
    hotKeysMap: state.preferences.hotkeys.map,
    hotKeysHandlers: state.preferences.hotkeys.handlers,
});

export default connect(mapStateToProps)(App);
