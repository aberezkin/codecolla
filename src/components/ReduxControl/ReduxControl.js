import {createStore, combineReducers} from 'redux'

import PeerControl from '../Peers/Peer.js';
import CRDTControl from '../CRDT/CRDTControl.js';


const checkboxReducer = function(state = false, action) {
    if (state === 'CHECKBOX') {
        return action.data;
    }
    return state;
}

const boolForOnChangeReducer = function(state = true, action) {
    if (state === 'ONCHANGE') {
        console.log("REDUCE ISREMOTE:", action.data);
		return action.data;
    }
    return state;
}

const crdtEventReducer = function(state = [], action) {
    if (state === 'CRDT_INSERT') {
        return action.data;
    }
    return state;
}



const reducers = combineReducers({
    checkboxReducer: checkboxReducer,
    boolForOnChangeReducer: boolForOnChangeReducer
});

//const ReduxControl = createStore(this.reducers);

export default reducers;