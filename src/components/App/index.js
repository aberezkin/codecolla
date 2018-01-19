import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
    isSeed: state.isSeed,
    theme: state.preferences.theme,
    isStatusBarVisible: state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    isSessionActive: state.preferences.isSessionActive,
});

export default connect(mapStateToProps)(App);
