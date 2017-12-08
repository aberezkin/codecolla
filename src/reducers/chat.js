import {ADD_MESSAGE} from "../actions";

const chatReducer = (state = {messages: []}, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload,
                ]
            };
        default: return state;
    }
};

export default chatReducer;