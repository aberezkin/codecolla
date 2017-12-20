import {withRouter} from "react-router-dom";
import RouteConnector from "./RouteConnector";
import {addPeerFromId} from "../../actions/index";
import {connect} from "react-redux";

const RouteConnectorWithRouter = withRouter(RouteConnector);

const mapStateToProps = (state, ownProps) => ({
    isReady: state.peers.id !== '',
    id: ownProps.match.params.id,
});

const mapDispatchToProps = dispatch => ({
    connect: id => dispatch(addPeerFromId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteConnectorWithRouter);
