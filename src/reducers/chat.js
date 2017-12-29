import { combineReducers } from 'redux';
import { ADD_MESSAGE, TOGGLE_CHAT, POST_FULFIL } from '../actions';

var create_message = (author, text, date) => {
    return {
        author: author,
        content: text,
        date: date,
    };
};

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                action.payload,
            ];

        case POST_FULFIL:
          console.log(action.value.errors)
            return [
                ...state,
                create_message("Output", action.value.output, new Date()),
                create_message("Error log", action.value.errors, new Date()),
            ];
        default: return state;
    }
};

const isVisible = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_CHAT:
            return !state;
        default: return state;
    }
};

export default combineReducers({ messages, isVisible });
