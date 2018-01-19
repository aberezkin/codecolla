import { combineReducers } from 'redux';
import { generateSetterReducer } from '../utilities/Helpers';
import {
    SET_ENCODING,
    SET_LANGUAGE,
    SET_LINEFEED,
    SET_THEME,
    TOGGLE_CHAT,
    TOGGLE_STATUS_BAR,
    ENTER_SESSION,
} from '../actions/index';

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

const isSessionActive = (state = false, action) => {
    switch (action.type) {
        case ENTER_SESSION:
            return true;
        default: return state;
    }
};

const language = generateSetterReducer(SET_LANGUAGE, 'javascript');
const linefeed = generateSetterReducer(SET_LINEFEED, 'LF');
const encoding = generateSetterReducer(SET_ENCODING, 'UTF-8');

const editor = combineReducers({ language, linefeed, encoding });

export default combineReducers({
    theme, editor, isChatVisible, isStatusBarVisible, isSessionActive,
});
