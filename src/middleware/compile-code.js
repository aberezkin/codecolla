import {
    sendCode,
    addMessage,
    handleMenuCommand,
    broadcastActions,
    TOGGLE_CHAT,
    COMPILE_CODE,
} from '../actions';

const LANGS = new Map([
    ['python', 0],
    ['ruby', 1],
    ['clojure', 2],
    ['php', 3],
    ['javascript', 4],
    ['scala', 5],
    ['go', 6],
    ['c_cpp', 7],
    ['java', 8],
    ['VB.NET', 9],
    ['csharp', 10],
    ['sh', 11],
    ['Objective-C', 12],
    ['mysql', 13],
    ['perl', 14],
    ['rust', 15],
]);

const createMessage = text => ({
    author: 'Compile Box',
    content: text,
    date: new Date(),
});
const getText = state => state.text.toArray().map(i => i.toObject().text).join('\n');
const getLanguage = (state) => {
    const langName = state.preferences.editor.language;
    if (!LANGS.has(langName))
        return -1;

    return LANGS.get(langName);
};


export default store => next => (action) => {
    const curState = store.getState();
    switch (action.type) {
        case COMPILE_CODE: {
            const language = getLanguage(curState);
            if (language < 0) {
                const addMessageAction = addMessage(createMessage('This language is not supported!'));
                next(addMessageAction);
                break;
            }
            const text = getText(curState);

            const sendCodeAction = sendCode(language, text);
            store.dispatch(broadcastActions([sendCodeAction]));
            next(sendCodeAction);

            if (!curState.preferences.isChatVisible) {
                const toggleChatAction = handleMenuCommand(TOGGLE_CHAT);
                store.dispatch(broadcastActions([toggleChatAction]));
                next(toggleChatAction);
            }

            const addMessageAction = addMessage(createMessage('Code is sent'));
            store.dispatch(broadcastActions([addMessageAction]));
            next(addMessageAction);
            break;
        }
        default: next(action);
    }
};
