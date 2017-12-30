import {
    sendCode,
    addMessage,
    handleMenuCommand,
    broadcastActions,
    TOGGLE_CHAT,
    COMPILE_CODE,
    COMPILE_RUBY,
    COMPILE_CPP,
} from '../actions';

const createMessage = text => ({
    author: 'compileBox',
    content: text,
    date: new Date(),
});
const getText = state => state.text.toArray().map(i => i.toObject().text).join('\n');
const getLanguage = (actionType) => {
    switch (actionType) {
        case COMPILE_RUBY:
            return '1';
        case COMPILE_CPP:
            return '7';
        default: return '1';
    }
};

export default store => next => (action) => {
    const curState = store.getState();
    switch (action.type) {
        case COMPILE_CODE:
        case COMPILE_RUBY:
        case COMPILE_CPP: {
            const language = getLanguage(action.type);
            const text = getText(curState);

            const sendCodeAction = sendCode(language, text);
            store.dispatch(broadcastActions([sendCodeAction]));
            next(sendCodeAction);

            if (!curState.preferences.isChatVisible) {
                const toggleChatAction = handleMenuCommand(TOGGLE_CHAT);
                store.dispatch(broadcastActions([toggleChatAction]));
                next(toggleChatAction);
            }

            const addMessageAction = addMessage(createMessage('Code is sending'));
            store.dispatch(broadcastActions([addMessageAction]));
            next(addMessageAction);
            break;
        }
        default: next(action);
    }
};
