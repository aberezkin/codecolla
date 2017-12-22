import { combineReducers } from 'redux';
import { TOGGLE_STATUS_BAR } from '../actions';

const isVisible = (state = true, action) => {
    switch (action.type) {
        case TOGGLE_STATUS_BAR:
            return !state;
        default: return state;
    }
};

export default combineReducers({ isVisible });
