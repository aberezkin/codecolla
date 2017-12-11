import {addCursor, ADD_CURSUR, deleteCursor, DELETE_CURSUR, setCursor, MOVE_CURSOR} from "../actions/index";
import {broadcastActions} from "../actions/index";

const cursorMiddleware = store => next => action => {
    switch (action.type) {
        case MOVE_CURSOR:
            action = setCursor(action.payload);
            store.dispatch(broadcastActions([action]));
            break;
        default: next(action);
    }
};

export default cursorMiddleware;