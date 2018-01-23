import { TOGGLE_FULLSCREEN } from '../actions/index';
import { toggleFullScreen } from '../utilities/Helpers';


const textMiddleware = store => next => action => {
    switch (action.type) {
        case TOGGLE_FULLSCREEN: {
            toggleFullScreen();   
            next(action);
            break;
        }
        default: next(action);
    }
};

export default textMiddleware;