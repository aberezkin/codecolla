import {broadcastActions, APPY_STEP_BACK_ACTION, STEP_BACK_ACTION,
    stepBackDeleteAction, stepBackClearAction, STEP_BACK_CHECK_ACTION} from "../actions/index";
import {generateLineId} from "../utilities/Helpers";

const stepBackShortcutMiddleware = store => next => action => {
    switch (action.type) {
        case STEP_BACK_ACTION:
            let returnData = store.getState().stepBack.history.peek();
            if (returnData === undefined) break;
            console.log('DEBUG::',returnData);
            store.dispatch(returnData);
            store.dispatch(broadcastActions(returnData));
            next(stepBackDeleteAction(action));
            break;
        case STEP_BACK_CHECK_ACTION:
            let history =  store.getState().stepBack.history;
            for (let i = 0; i < history.size; ++i) {
                if (action.payload === history.get(i)[0].payload.line) {
                    store.dispatch(stepBackClearAction(true));
                }
            }
            break;
        default: next(action);
    }
};

export default stepBackShortcutMiddleware;
