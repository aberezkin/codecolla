import { combineReducers } from 'redux';
import { reducer as fetchReducer } from 'react-redux-fetch';
import isSeed from './is-seed';
import isTransferAllowed from './is-transfer-allowed';
import peers from './peer';
import text from './text';
import chat from './chat';
import cursors from './cursor';
import preferences from './preferences';

export default combineReducers({
    isSeed,
    isTransferAllowed,
    peers,
    text,
    chat,
    cursors,
    preferences,
    fetchReducer,
});
