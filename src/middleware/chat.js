import { addMessage, broadcastActions, SEND_MESSAGE } from '../actions';

export default store => next => (action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            const addMessageAction = addMessage(action.payload);
            store.dispatch(broadcastActions([addMessageAction]));
            next(addMessageAction);
            break;
        }
        default: next(action);
    }
};
