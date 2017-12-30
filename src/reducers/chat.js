import { combineReducers } from 'redux';
import { ADD_MESSAGE, POST_FULFIL } from '../actions';

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
            console.log(action.value.errors);
            return [
                ...state,
                createMessage('Output', action.value.output, new Date()),
                createMessage('Error log', action.value.errors, new Date()),
            ];
        default: return state;
    }
};

export default combineReducers({ messages });
