import { ADD_PEER, REMOVE_PEER } from '../actions/index';

function peersReducer(state = [], action) {
    switch (action.type) {
        case ADD_PEER:
            return [...state, action.payload];
        case REMOVE_PEER:
            return state.filter(conn => conn.peer !== action.payload.peer);
        default:
            return state;
    }
}

export default peersReducer;
