import {ADD_MESSAGE, TOGGLE_CHAT} from "../actions";
import {combineReducers} from 'redux';

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                action.payload,
            ];
        default: return state;
    }
};

const isVisible = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_CHAT:
            return !state;
        default: return state;
    }
}

export default combineReducers({messages, isVisible});
