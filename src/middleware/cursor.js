import { setCursor, MOVE_CURSOR, broadcastActions } from '../actions/index';

const cursorMiddleware = store => next => (action) => {
    switch (action.type) {
        case MOVE_CURSOR:
            store.dispatch(broadcastActions([setCursor(action.payload)]));
            break;
        default: next(action);
    }
};

export default cursorMiddleware;
