import { connect } from 'react-redux';
import { addPeerFromId } from '../../actions';
import Connector from './Connector';

const mapDispatchToProps = dispatch => ({
    connectToPeer: id => dispatch(addPeerFromId(id, true)),
});

export default connect(null, mapDispatchToProps)(Connector);
