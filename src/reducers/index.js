import { combineReducers } from 'redux';
import isSeed from './is-seed';
import isTransferAllowed from './is-transfer-allowed';
import editorPreferences from './preferences';
import peers from './peer';
import text from './text';
import chat from './chat';
import preferences from './preferences';

export default combineReducers({
    isSeed,
    isTransferAllowed,
    editorPreferences,
    peers,
    text,
    chat,
    preferences,
});
