import {ADD_MESSAGE} from "../actions";
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

export default combineReducers({messages});
