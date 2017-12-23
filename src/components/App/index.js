import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = state => ({
    isSeed: state.isSeed,
    theme: state.editorPreferences.theme,
    isStatusBarVisible: state.statusBar.isVisible,
    isChatVisible: state.chat.isVisible,
});

export default connect(mapStateToProps)(App);
