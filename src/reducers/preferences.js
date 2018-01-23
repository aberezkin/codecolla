import { combineReducers } from 'redux';
import { generateSetterReducer } from '../utilities/Helpers';
import {
    SET_ENCODING,
    SET_LANGUAGE,
    SET_LINEFEED,
    SET_THEME,
    TOGGLE_CHAT,
    TOGGLE_INVITE_MODAL,
    TOGGLE_URL_MODAL,
    TOGGLE_ABOUT_MODAL,
    TOGGLE_STATUS_BAR,
    ENTER_SESSION,
    ADD_HOTKEY,
    createSimpleAction,
} from '../actions';

const theme = generateSetterReducer(SET_THEME, 'monokai');

const isChatVisible = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_CHAT:
            return !state;
        default: return state;
    }
};

const isStatusBarVisible = (state = true, action) => {
    switch (action.type) {
        case TOGGLE_STATUS_BAR:
            return !state;
        default: return state;
    }
};

const isInviteModalOpen = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_INVITE_MODAL:
            return !state;
        default: return state;
    }
};

const isURLModalOpen = (state = false, action) => {
    switch (action.type) {
        case TOGGLE_URL_MODAL:
            return !state;
        default: return state;
    }
};

const isAboutModalOpen = (state = false, action) => {
    return action.type === TOGGLE_ABOUT_MODAL ? !state : state;
}

const isSessionActive = (state = false, action) => {
    switch (action.type) {
        case ENTER_SESSION:
            return true;
        default: return state;
    }
};

const nickname = generateSetterReducer(ENTER_SESSION, '');
const language = generateSetterReducer(SET_LANGUAGE, 'javascript');
const linefeed = generateSetterReducer(SET_LINEFEED, 'LF');
const encoding = generateSetterReducer(SET_ENCODING, 'UTF-8');

const editor = combineReducers({ language, linefeed, encoding });

const hotKeys = (state = {}, action) => {
    switch (action.type) {
        case ADD_HOTKEY: {
            return {
                ...state,
                [action.payload.command] : action.payload.hotkey,
            };
        }
        default:
            return state;
    }
};

const hotKeysHandlers = (state = {}, action) => {
    switch (action.type) {
        case ADD_HOTKEY: {
            return {
                ...state,
                [action.payload.command] : action.payload.handler,
            };
        }
        default:
            return state;
    }
};

const hotkeys = combineReducers({ map: hotKeys, handlers: hotKeysHandlers});

export default combineReducers({
    nickname,
    theme,
    editor,
    hotkeys,
    isChatVisible,
    isStatusBarVisible,
    isSessionActive,
    isInviteModalOpen,
    isURLModalOpen,
    isAboutModalOpen,
});
