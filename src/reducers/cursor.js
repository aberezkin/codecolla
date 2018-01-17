import { Map } from 'immutable';
import { ADD_CURSOR, DELETE_CURSOR, SET_CURSOR } from '../actions/index';

function cursorReducer(state = Map(), { type, payload }) {
    switch (type) {
        case ADD_CURSOR:
            return state.set(payload.id, payload.pos);
        case DELETE_CURSOR:
            return state.delete(payload);
        case SET_CURSOR:
            return state.set(payload.id, payload.pos);
        default:
            return state;
    }
}

export default cursorReducer;
