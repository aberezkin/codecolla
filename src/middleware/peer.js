import '../utilities/Peers/Peerjs.js';

import {ADD_PEER, ADD_PEER_FROM_ID, addPeer, INIT_PEER, removePeer} from "../actions/index";
import {DATA_TRANSFER, PEER_ERROR, CONNECTION_CLOSE, CONNECTION_EVENT, CONNECTION_OPEN} from '../utilities/Peers/Peer'
import {CHAT_MESSAGE, DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION} from "../utilities/Peers/ChangeEvent"
import ChangeEvent from "../utilities/Peers/ChangeEvent";

let peer = new Peer({key: 'e0twf5gs81lzbyb9'});
peer.on(CONNECTION_OPEN, (id) => console.log('pid: ', id));

function eventifyConnection(connection, isSeed, addConnection, removeConnection) {
    connection.on(CONNECTION_OPEN, () => {
        if (isSeed) this.broadcastEvent(ChangeEvent.getAddPeerEvent(connection.peer));
    });

    connection.on(DATA_TRANSFER, (data) => {
        let unpackedEventArray = JSON.parse(data);
        let unpackedEvent = unpackedEventArray[0];

        switch (unpackedEvent.action) {
            case CHAT_MESSAGE: {
                // TODO: handle chat message
                console.log(connection.peer + ": " + unpackedEvent.text);
                break;
            }
            case DELETE_CURSOR:
            case MOVE_CURSOR:
            case ADD_CURSOR: {
                // TODO
                // this.cursorEventHandler({
                //     type: unpackedEvent.action,
                //     peerId: unpackedEvent.peer,
                //     position: unpackedEvent.pos
                // });
                break;
            }
            case PEER_ADDITION: {
                addConnection(peer.connect(unpackedEvent.data));
                break;
            }
            default: {
                // TODO: this.eventHandler(unpackedEventArray);
            }
        }
    });

    connection.on(PEER_ERROR, () => {
        alert(connection.peer + ' : ERROR.');
        removeConnection(connection);

    });

    connection.on(CONNECTION_CLOSE, () => {
        alert(connection.peer + ' has left the chat.');
        removeConnection(connection);
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
                connection => store.dispatch(addPeer(connection)),
                connection => store.dispatch(removePeer(connection)))));
            break;
        default: next(action)
    }
};

export default peersMiddleware;
