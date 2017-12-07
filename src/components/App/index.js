import {connect} from 'react-redux';
import App from './App'
import {addPeer, initPeer, setText} from "../../actions/index";

const mapStateToProps = (state) => {
    return {
        isSeed: state.isSeed,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initPeer: () => dispatch(initPeer()),
        addPeer: (connection) => dispatch(addPeer(connection)),
        setText: (text) => dispatch(setText(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
