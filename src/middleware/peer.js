import '../utilities/Peerjs.js';

import {ADD_PEER, ADD_PEER_FROM_ID, addPeer, BROADCAST_ACTIONS, INIT_PEER, removePeer} from "../actions/index";
import {CHAT_MESSAGE, DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION} from "../utilities/ChangeEvent"
import ChangeEvent from "../utilities/ChangeEvent";

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

let peer = new Peer({key: 'e0twf5gs81lzbyb9'});
peer.on(CONNECTION_OPEN, (id) => console.log('pid: ', id));

function eventifyConnection(connection, isSeed, dispatch) {
    connection.on(CONNECTION_OPEN, () => {
        if (isSeed) this.broadcastEvent(ChangeEvent.getAddPeerEvent(connection.peer));
    });

    connection.on(DATA_TRANSFER, (data) => {
        let eventArray = JSON.parse(data);
        let firstEvent = eventArray[0];

        // TODO: Send ONLY redux actions and just dispatch them
        switch (firstEvent.action) {
            case DELETE_CURSOR:
            case MOVE_CURSOR:
            case ADD_CURSOR: {
                // TODO: handle cursor changes messages
                // this.cursorEventHandler({
                //     type: unpackedEvent.action,
                //     peerId: unpackedEvent.peer,
                //     position: unpackedEvent.pos
                // });
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
            next(action);
            break;
        case ADD_PEER_FROM_ID:
            action = addPeer(peer.connect(action.payload)); // Just modify action before eventifying connection
        case ADD_PEER:
            next(addPeer(eventifyConnection(action.payload,
                store.getState().isSeed,
                store.dispatch)));
            break;
        case BROADCAST_ACTIONS:
            store.getState().peers.forEach(conn => conn.send(JSON.stringify(action.payload)));
            break;
        default: next(action)
    }
};

export default peersMiddleware;
