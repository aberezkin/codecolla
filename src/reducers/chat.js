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

        case POST_FULFIL: {
            const dateOutput = new Date();
            const dateLog = new Date(dateOutput.valueOf() + 1);
            return [
                ...state,
                createMessage('Output', action.value.output, dateOutput),
                createMessage('Error log', action.value.errors, dateLog),
            ];
        }
        case POST_REJECT:
            return [
                ...state,
                createMessage('Error', action.reason.message, new Date()),
            ];
        default: return state;
    }
};

export default combineReducers({ messages });
