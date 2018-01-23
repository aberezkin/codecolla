import { connect } from 'react-redux';
import URL from './URL';
import { createSimpleAction, TOGGLE_URL_MODAL, openUrl } from '../../actions';
/*
const mapStateToProps = state => ({
    peerId: state.peers.id,
});
*/
const mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(createSimpleAction(TOGGLE_URL_MODAL)),
    openUrl: (url) => dispatch(openUrl(url)),
});

export default connect(null, mapDispatchToProps)(URL);