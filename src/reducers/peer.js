import {ADD_PEER, REMOVE_PEER, SET_PEER_ID, ADD_ALL_TEXT} from "../actions/index";
import { combineReducers } from "redux";
import {generateSetterReducer} from '../utilities/Helpers'

const idReducer = generateSetterReducer(SET_PEER_ID, '')

function connectionsReducer(state = [], action) {
    switch (action.type) {
        case ADD_PEER:
            return [...state, action.payload];
        case REMOVE_PEER:
            return state.filter(conn => conn.peer !== action.payload.peer);
        default:
            return state;
    }
}

export default combineReducers({
    id: idReducer,
    connections: connectionsReducer,
});
