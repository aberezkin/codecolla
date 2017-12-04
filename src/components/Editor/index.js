import {connect} from 'react-redux';
import {setIsTransferAllowed} from "../../actions/index";
import Editor from "./Editor";

const mapStateToProps = (state) => {
    return {
        isTransferAllowed: state.isTransferAllowed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        allowEventTransfer: (flag) => dispatch(setIsTransferAllowed(flag))
    }
};

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(Editor);
