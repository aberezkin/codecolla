import { connect } from 'react-redux';
import App from './App';
import { addPeer, initPeer, setText } from '../../actions/index';

const mapStateToProps = state => ({
    isSeed: state.isSeed,
    theme: state.editorPreferences.theme,
    isStatusBarVisible: state.statusBar.isVisible,
    isChatVisible: state.chat.isVisible,
});

const mapDispatchToProps = dispatch => ({
    initPeer: () => dispatch(initPeer()),
    addPeer: connection => dispatch(addPeer(connection)),
    setText: text => dispatch(setText(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
