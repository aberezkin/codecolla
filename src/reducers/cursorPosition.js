import { MOVE_CURSOR } from "../actions/index";
import { Map } from 'immutable';

const cursorPosition = (state = Map([['row', 0],['column', 0]]), action) => {
    switch (action.type) {
        case MOVE_CURSOR: {
            return action.payload.pos;
        }
        default: return state;
    }
};

export default cursorPosition;
