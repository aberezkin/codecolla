import { combineReducers } from 'redux';
import { reducer as fetchReducer } from 'react-redux-fetch';
import isTransferAllowed from './is-transfer-allowed';
import peers from './peer';
import text from './text';
import chat from './chat';
import cursors from './cursor';
import preferences from './preferences';
import stepBack from './stepBackShortcut';

export default combineReducers({
    isTransferAllowed,
    peers,
    text,
    chat,
    cursors,
    preferences,
    fetchReducer,
    stepBack,
});
