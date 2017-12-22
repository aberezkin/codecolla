import { connect } from 'react-redux';
import { setIsSeed, addPeerFromId } from '../../actions';
import Connector from './Connector';

const mapDispatchToProps = dispatch => ({
    seedChange: e => dispatch(setIsSeed(e.target.checked)),
    connectToPeer: id => dispatch(addPeerFromId(id)),
});

export default connect(null, mapDispatchToProps)(Connector);
