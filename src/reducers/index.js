import {applyMiddleware, combineReducers} from 'redux'
import isSeed from './is-seed';
import isTransferAllowed from './is-transfer-allowed';
import editorPreferences from './editor-preferences';
import peers from './peer';
import peersMiddleware from '../middleware/peer';

export default combineReducers({
    isSeed,
    isTransferAllowed,
    editorPreferences,
    peers,
});
