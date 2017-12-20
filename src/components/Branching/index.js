import { connect } from 'react-redux';
import Branching from './Branching';
import {initPeer, setText} from "../../actions/index";

const mapDispatchToProps = (dispatch) => {
    return {
        initPeer: () => dispatch(initPeer()),
        setText: (text) => dispatch(setText(text))
    }
};

export default connect(null, mapDispatchToProps)(Branching);
