import { setCursor, MOVE_CURSOR, broadcastActions } from '../actions/index';

const cursorMiddleware = store => next => (action) => {
    switch (action.type) {
        case MOVE_CURSOR: {
            const newAction = setCursor(action.payload);
            store.dispatch(broadcastActions([newAction]));
            break;
        }
        default: next(action);
    }
};

export default cursorMiddleware;
