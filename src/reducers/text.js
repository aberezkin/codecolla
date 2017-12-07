import {List, Map} from 'immutable';
import {REMOVE_LINE, INSERT_LINE, SET_LINE, SET_TEXT} from "../actions/index";

function textReducer(state = List(), action) {
    switch (action.type) {
        case SET_TEXT:
            return List(action.payload);
        case SET_LINE:
            return state.set(action.payload.line, Map(action.payload.atom));
        case INSERT_LINE:
            return state.insert(action.payload.line, Map(action.payload.atom));
        case REMOVE_LINE:
            return state.delete(action.payload);
        default: return state;
    }
}

export default textReducer;
