import '../utilities/Peerjs.js';

import {ADD_PEER, ADD_PEER_FROM_ID, addPeer, BROADCAST_ACTIONS, 
    GET_ALL_TEXT, BROADCAST_DATA_TO_PEER, INIT_PEER, removePeer,
    setPeerId, sendAllText, broadcastActions, addPeerFromId} from "../actions/index";
import {CHAT_MESSAGE, DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION} from "../utilities/ChangeEvent"
import ChangeEvent from "../utilities/ChangeEvent";
import {SET_CURSOR} from "../actions/index"

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

let peer = new Peer({key: 'e0twf5gs81lzbyb9'});

function eventifyConnection(connection, isSeed, dispatch) {
    connection.on(CONNECTION_OPEN, () => {
        if (isSeed) {
            dispatch(sendAllText(connection.peer));
            dispatch(broadcastActions(addPeerFromId(connection.peer))); 
        }
    });

    connection.on(DATA_TRANSFER, (data) => {
        let eventArray = JSON.parse(data);
        let firstEvent = eventArray[0];

        // TODO: Send ONLY redux actions and just dispatch them
        switch (firstEvent.action) {
            case DELETE_CURSOR:
            case MOVE_CURSOR:
            case SET_CURSOR:
            case ADD_CURSOR: {
                dispatch(eventArray);
                break;
            }
            case PEER_ADDITION: {
                dispatch(addPeer(peer.connect(firstEvent.data)));
                break;
            }
            default: {
                dispatch(eventArray);
            }
        }
    });

    connection.on(PEER_ERROR, () => {
        alert(connection.peer + ' : ERROR.');
        dispatch(removePeer(connection));

    });

    connection.on(CONNECTION_CLOSE, () => {
        alert(connection.peer + ' has left the chat.');
        dispatch(removePeer(connection));
    });
       
    return connection;
}

const peersMiddleware = store => next => action => {
    switch (action.type) {
        case INIT_PEER:
            peer.on(CONNECTION_EVENT, connection => store.dispatch(addPeer(connection)));
            peer.on(CONNECTION_OPEN, (id) => {
                console.log('pid: ', id);
                store.dispatch(setPeerId(id));
            });
            break;
        case ADD_PEER_FROM_ID:
            action = addPeer(peer.connect(action.payload)); // Just modify action before eventifying connection
        case ADD_PEER:
            next(addPeer(eventifyConnection(action.payload,
                store.getState().isSeed,
                store.dispatch)));
            break;
        case BROADCAST_ACTIONS:
            store.getState().peers.connections.forEach(conn => conn.send(JSON.stringify(action.payload)));
            break;
        case BROADCAST_DATA_TO_PEER:
            store.getState().peers.connections
                .find(conn => conn.peer === action.payload.id)
                .send(JSON.stringify(action.payload.broadcastedAction));
            break;
        default: next(action)
    }
};

export default peersMiddleware;
