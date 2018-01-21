import {Stack, Set} from 'immutable';
import {STEP_BACK_ADD_LINE_TO_SET, STEP_BACK_DELETE_LINE_FROM_SET,
    STEP_BACK_CLEAR_SET,
    STEP_BACK_ADD_ACTION, STEP_BACK_DELETE_ACTION, STEP_BACK_CLEAR_ACTION} from "../actions/index";
import { combineReducers } from 'redux';

function stepBackShortcutSetReducer(state = Set(), action) {
    switch (action.type) {
        case STEP_BACK_ADD_LINE_TO_SET:
            return state.add(action.payload);
        case STEP_BACK_DELETE_LINE_FROM_SET:
            return state.delete();
        case STEP_BACK_CLEAR_SET:
            return state.clear();
        default:
            return state;
    }
}

function stepBackShortcutReducer(state = Stack(), action) {
    switch (action.type) {
        case STEP_BACK_ADD_ACTION:
            return state.push(action.payload);
        case STEP_BACK_DELETE_ACTION:
            return state.pop();
        case STEP_BACK_CLEAR_ACTION:
            return state.clear();
        default:
            return state;
    }
}

export default combineReducers({
    linesSet: stepBackShortcutSetReducer,
    history: stepBackShortcutReducer
});

