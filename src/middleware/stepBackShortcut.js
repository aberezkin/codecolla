import {broadcastActions, APPY_STEP_BACK_ACTION, STEP_BACK_ACTION,
    stepBackDeleteAction, stepBackClearAction, STEP_BACK_CHECK_ACTION, stepBackPrepaerStack, STEP_FORWARD_ACTION, stepForwardReturnAction} from "../actions/index";
import {generateLineId} from "../utilities/Helpers";

const stepBackShortcutMiddleware = store => next => action => {
    let position;
    let returnData, otherAct;
    switch (action.type) {
        case STEP_BACK_ACTION:
            position = store.getState().stepBack.history.pointer;
            otherAct = store.getState().stepBack.history.otherUsersActionCnt;
            if (position < store.getState().stepBack.history.st.size && otherAct == 0)
            {
                store.getState().stepBack.history.otherUsersActionCnt = store.getState().stepBack.history.st.get(position).howMuchActMustBeCanceled;
                returnData = store.getState().stepBack.history.st.get(position).actionHistory;
                if (returnData === undefined) break;
                console.log('DEBUG::',returnData);
                store.dispatch(returnData);
                store.dispatch(broadcastActions(returnData));
                next(stepBackDeleteAction(action));   
            }
            break;
        case STEP_FORWARD_ACTION:
            position = store.getState().stepBack.history.pointer;
            if (position > 0 && store.getState().stepBack.history.otherUsersActionCnt == store.getState().stepBack.history.st.get(position - 1).howMuchActMustBeCanceled)
            {  
                next(stepForwardReturnAction(action));
                position = store.getState().stepBack.history.pointer;
                if (position - 1 < 0)
                    store.getState().stepBack.history.otherUsersActionCnt = 0;
                else
                    store.getState().stepBack.history.otherUsersActionCnt = store.getState().stepBack.history.st.get(position - 1).howMuchActMustBeCanceled;
                returnData = store.getState().stepBack.history.st.get(position).actions;
                if (returnData === undefined) break;
                console.log('DEBUG::',returnData);
                store.dispatch(returnData);
                store.dispatch(broadcastActions(returnData));
            }
            break;
        case STEP_BACK_CHECK_ACTION:
            let history =  store.getState().stepBack.history.actionHistory;
            for (let i = 0; i < history.st.size; ++i) {
                if (action.payload === history.st.get(i)[0].payload.line) {
                    store.dispatch(stepBackClearAction(true));
                }
            }
            break;
        default: next(action);
    }
};

export default stepBackShortcutMiddleware;
