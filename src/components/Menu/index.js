import {connect} from "react-redux";
import Menu from "./Menu";
import {handleMenuCommand} from "../../actions/index";

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => {
    return {
        onMenuOptionHandler: (command) => dispatch(handleMenuCommand(command)),
    }
};

export default connect(null, mapDispatchToProps)(Menu);