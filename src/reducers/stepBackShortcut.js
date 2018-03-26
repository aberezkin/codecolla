import {Stack, Set} from 'immutable';
import {STEP_BACK_ADD_LINE_TO_SET, STEP_BACK_DELETE_LINE_FROM_SET,
    STEP_BACK_CLEAR_SET,
    STEP_BACK_ADD_ACTION, STEP_BACK_DELETE_ACTION, STEP_BACK_CLEAR_ACTION, STEP_BACK_PREPAER_STACK, STEP_FORWARD_RETURN_ACTION, RESET_HISTORY} from "../actions/index";
import { combineReducers } from 'redux';

const initialState = {st: Stack(), pointer: 0, otherUsersActionCnt: 0};

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


function stepBackShortcutReducer(state = initialState, action) {
    switch (action.type) {
        case STEP_BACK_PREPAER_STACK:
            return {st: state.st.pop(), pointer:state.pointer - 1, otherUsersActionCnt: state.otherUsersActionCnt};
        case STEP_BACK_ADD_ACTION:
            return {st: state.st.push(action.payload), pointer:state.pointer, otherUsersActionCnt: state.otherUsersActionCnt};
        case STEP_BACK_DELETE_ACTION:
            return {st: state.st, pointer:state.pointer + 1, otherUsersActionCnt: state.otherUsersActionCnt};
        case STEP_FORWARD_RETURN_ACTION:
            if (state.pointer > 0)
                return {st: state.st, pointer:state.pointer - 1, otherUsersActionCnt: state.otherUsersActionCnt};
            else
                return {st: state.st, pointer:state.pointer, otherUsersActionCnt: state.otherUsersActionCnt};
        case RESET_HISTORY:
            return {st: Stack(), pointer: 0, otherUsersActionCnt: 1};
        default:
            return state;
    }
}


export default combineReducers({
    linesSet: stepBackShortcutSetReducer,
    history: stepBackShortcutReducer
});

