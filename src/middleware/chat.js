import {addMessage, broadcastActions, SEND_MESSAGE} from "../actions";

export default store => next => action => {
    switch (action.type) {
        case SEND_MESSAGE:
            action = addMessage(action.payload);
            store.dispatch(broadcastActions([action]));
        default: next(action)
    }
};
