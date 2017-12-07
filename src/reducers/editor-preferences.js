import {combineReducers} from 'redux'
import {generateSetterReducer} from "../utilities/Helpers";
import {SET_ENCODING, SET_LANGUAGE, SET_LINEFEED, SET_THEME} from "../actions/index";

const theme = generateSetterReducer(SET_THEME, 'monokai');
const language = generateSetterReducer(SET_LANGUAGE, 'javascript');
const linefeed = generateSetterReducer(SET_LINEFEED, 'LF');
const encoding = generateSetterReducer(SET_ENCODING, 'UTF-8');

export default combineReducers({theme, language, linefeed, encoding});
