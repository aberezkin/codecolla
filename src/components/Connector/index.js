import {connect} from 'react-redux';
import {setIsSeed} from "../../actions"
import Connector from './Connector';

const mapDispatchToProps = (dispatch) => {
    return {
        seedChange: (e) => dispatch(setIsSeed(e.target.checked))
    }
};

export default connect(null, mapDispatchToProps)(Connector);