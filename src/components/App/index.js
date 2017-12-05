import {connect} from 'react-redux';
import App from './App'
import {addPeer, initPeer} from "../../actions/index";

const mapStateToProps = (state) => {
    return {
        isSeed: state.isSeed,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        initPeer: () => dispatch(initPeer()),
        addPeer: (connection) => dispatch(addPeer(connection))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
