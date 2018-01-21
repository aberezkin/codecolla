import { combineReducers } from 'redux';
import { ADD_PEER, REMOVE_PEER, SET_PEER_ID } from '../actions/index';
import { generateSetterReducer } from '../utilities/Helpers';
import peer from '../middleware/peer';

const idReducer = generateSetterReducer(SET_PEER_ID, '');

function connectionsReducer(state = [], action) {
    switch (action.type) {
        case ADD_PEER: {
            if (state.find(peer => peer == action.payload)) {
                return state;
            }
            return [...state, action.payload];
        }
        case REMOVE_PEER:
            return state.filter(conn => conn.peer !== action.payload.peer);
        default:
            return state;
    }
}

export default combineReducers({
    id: idReducer,
    connections: connectionsReducer,
});
