import {combineReducers} from 'redux'
import isSeed from './is-seed';
import isTransferAllowed from  './is-transfer-allowed';

export default  combineReducers({
    isSeed,
    isTransferAllowed
});