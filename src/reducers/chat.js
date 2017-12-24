import { combineReducers } from 'redux';
import { ADD_MESSAGE } from '../actions';

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

export default combineReducers({ messages });
