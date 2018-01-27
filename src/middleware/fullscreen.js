import { TOGGLE_FULLSCREEN, TOGGLE_FULLSCREEN_MODE, createSimpleAction } from '../actions/index';
import { toggleFullScreen } from '../utilities/Helpers';


const fullscreenMiddleware = store => next => action => {
    switch (action.type) {
        case TOGGLE_FULLSCREEN: {
            toggleFullScreen();
            next(action);
            break;
        }
        default: next(action);
    }
};

export default fullscreenMiddleware;