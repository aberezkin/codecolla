import { connect } from 'react-redux';
import Invite from './Invite';

const mapStateToProps = state => ({
    peerId: state.peers.id,
})

export default connect(mapStateToProps)(Invite);
