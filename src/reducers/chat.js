import { combineReducers } from 'redux';
import { ADD_MESSAGE, POST_FULFIL, POST_REJECT } from '../actions';

const createMessage = (author, text, date) => ({
    author,
    content: text,
    date,
});

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [
                ...state,
                action.payload,
            ];

        case POST_FULFIL:
            return [
                ...state,
                createMessage('Output', action.value.output, new Date()),
                createMessage('Error log', action.value.errors, new Date()),
            ];
        case POST_REJECT:
            return [
                ...state,
                createMessage('Error', action.reason.message, new Date()),
            ];
        default: return state;
    }
};

export default combineReducers({ messages });
