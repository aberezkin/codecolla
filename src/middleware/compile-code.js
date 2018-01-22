import {
    addMessage,
    handleMenuCommand,
    sendCode,
    sendMessage,
    TOGGLE_CHAT,
    COMPILE_CODE,
    POST_FULFIL,
    POST_REJECT,
} from '../actions';
import { atomsToString } from '../utilities/Helpers.js';

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

const createMessage = (author, text, date = new Date()) => ({
    author,
    content: text,
    date,
});
const getText = state => atomsToString(state.text);
const getLanguage = (state) => {
    const langName = state.preferences.editor.language;
    if (!LANGS.has(langName))
        return -1;

    return LANGS.get(langName);
};


export default store => next => (action) => {
    const curState = store.getState();
    switch (action.type) {
        case POST_FULFIL: {
            const dateOutput = new Date();
            const dateLog = new Date(dateOutput.valueOf() + 1);
            const sendStdout = sendMessage(createMessage('Compile Box (stdout)', action.value.output, dateOutput));
            const sendStderr = sendMessage(createMessage('Compile Box (stderr)', action.value.errors, dateLog));
            store.dispatch([sendStdout, sendStderr]);
            next(action);
            break;
        }
        case POST_REJECT: {
            const addMessageAction = addMessage(createMessage('Compile Box', action.reason.message, new Date()));
            store.dispatch(addMessageAction);
            next(action);
            break;
        }
        case COMPILE_CODE: {
            const language = getLanguage(curState);
            const text = getText(curState);

            if (!curState.preferences.isChatVisible) {
                const toggleChatAction = handleMenuCommand(TOGGLE_CHAT);
                store.dispatch(toggleChatAction);
            }
            if (language < 0) {
                const sendMessageAction = sendMessage(createMessage('Compile Box', 'This language is not supported!'));
                store.dispatch(sendMessageAction);
                break;
            }

            const sendCodeAction = sendCode(language, text);
            const sendMessageAction = sendMessage(createMessage('Compile Box', 'Code is sent'));
            store.dispatch([sendCodeAction, sendMessageAction]);
            break;
        }
        default: next(action);
    }
};
