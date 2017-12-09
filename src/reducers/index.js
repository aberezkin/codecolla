import {applyMiddleware, combineReducers} from 'redux'
import isSeed from './is-seed';
import isTransferAllowed from './is-transfer-allowed';
import editorPreferences from './editor-preferences';
import peers from './peer';
import text from './text';
import cursors from './cursor';

export default combineReducers({
    isSeed,
    isTransferAllowed,
    editorPreferences,
    peers,
    text,
    cursors
});
