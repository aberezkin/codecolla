import { connect } from 'react-redux';
import Invite from './Invite';
import { createSimpleAction, TOGGLE_INVITE_MODAL } from '../../actions';

const mapStateToProps = state => ({
    peerId: state.peers.id,
});

const mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(createSimpleAction(TOGGLE_INVITE_MODAL)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
