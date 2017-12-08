import {connect} from 'react-redux';
import Chat from './Chat'
import {addMessage, sendMessage} from "../../actions";

const mapStateToProps = state => {
    return {
        messages: state.chat.messages
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMessage: message => dispatch(sendMessage(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
