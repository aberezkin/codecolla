import {combineReducers} from 'redux'
import isSeed from './is-seed';
import isTransferAllowed from './is-transfer-allowed';
import editorPreferences from './editor-preferences';

export default combineReducers({
    isSeed,
    isTransferAllowed,
    editorPreferences
});