import {
    sendCode,
    addMessage,
    handleMenuCommand,
    broadcastActions,
    toggleChat,
    TOGGLE_CHAT,
    COMPILE_CODE,
    COMPILE_RUBY,
    COMPILE_CPP,
} from '../actions';

var create_message = text => {
    return {
        author: 'compileBox',
        content: text,
        date: new Date(),
    };
};

var get_text = state => {
    return state.text.toArray().map(i => i.toObject().text).join("\n");
}

var get_language = action_type => {
    switch (action_type){
      case COMPILE_RUBY:
        return "1";
      case COMPILE_CPP:
        return "7";
      default: return "1";
    }
}

export default store => next => (action) => {
    const curState = store.getState();
    switch (action.type) {
        case COMPILE_CODE:
        case COMPILE_RUBY:
        case COMPILE_CPP: {

            const language = get_language(action.type);
            const text = get_text(curState);

            const sendCodeAction = sendCode(language, text);
            store.dispatch(broadcastActions([sendCodeAction]));
            next(sendCodeAction);

            if (!curState.chat.isVisible){
                const toggleChatAction = handleMenuCommand(TOGGLE_CHAT);
                store.dispatch(broadcastActions([toggleChatAction]));
                next(toggleChatAction);
            }

            const addMessageAction = addMessage(create_message("Code is sending"));
            store.dispatch(broadcastActions([addMessageAction]));
            next(addMessageAction);
            break;
        }
        default: next(action);
    }
};
