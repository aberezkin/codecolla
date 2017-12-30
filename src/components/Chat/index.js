import { connect } from 'react-redux';
import Chat from './Chat';
import { sendMessage } from '../../actions';

const mapStateToProps = state => ({
    messages: state.chat.messages,
});

const mapDispatchToProps = dispatch => ({
    onMessage: message => dispatch(sendMessage(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
