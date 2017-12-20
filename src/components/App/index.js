import {connect} from 'react-redux';
import App from './App'
import {addPeer, initPeer, setText} from "../../actions/index";

const mapStateToProps = (state) => {
    return {
        isSeed: state.isSeed,
        theme: state.editorPreferences.theme,
    }
};

export default connect(mapStateToProps)(App)
