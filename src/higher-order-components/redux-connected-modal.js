import { connect } from 'react-redux';
import Modal from 'react-modal';
import { createSimpleAction } from '../actions/index';

export const createConnectedModal = (location, actionType) => {
    const mapStateToProps = state => ({
        isOpen: state.preferences[location],
    })
    const mapDispatchToProps = dispatch => ({
        onRequestClose: () => dispatch(createSimpleAction(actionType)),
    })

    return connect(mapStateToProps, mapDispatchToProps)(Modal);
}

