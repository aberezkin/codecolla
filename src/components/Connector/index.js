import {connect} from 'react-redux';
import {setIsSeed} from "../../actions"
import Connector from './Connector';
import {addPeerFromId} from "../../actions/index";

const mapDispatchToProps = (dispatch) => {
    return {
        seedChange: (e) => dispatch(setIsSeed(e.target.checked)),
        connectToPeer: (id) => dispatch(addPeerFromId(id)),
    }
};

export default connect(null, mapDispatchToProps)(Connector);