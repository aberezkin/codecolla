import '../utilities/Peerjs';
import { ADD_PEER, ADD_PEER_FROM_ID, addPeer, BROADCAST_ACTIONS, ADD_MESSAGE, broadcastActionsToPeer,
    BROADCAST_DATA_TO_PEER, INIT_PEER, removePeer, CONNECT_TO_ALL_PEERS, connectToAllPeers, setText,
    setPeerId, sendAllText, broadcastActions, addPeerFromId, SET_CURSOR, deleteCursor } from '../actions/index';
import { DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION } from '../utilities/ChangeEvent';
import { atomsToString } from '../utilities/Helpers'
import { HANDLE_INITIALS, handleInitials } from '../actions/peer';

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

const localPeer = new Peer({ key: 'e0twf5gs81lzbyb9' });

const createMessage = (author, text, date = new Date()) => ({
    author,
    content: text,
    date,
});

function eventifyConnection(connection, dispatch, peer) {
    let isConnected = false;
    connection.on(DATA_TRANSFER, (data) => {
        const eventArray = JSON.parse(data);
        const firstEvent = eventArray[0];
        // TODO: Send ONLY redux actions and just dispatch them
        switch (firstEvent.type) {
            case HANDLE_INITIALS: {
                if (!isConnected) {
                    isConnected = true;
                    const { payload } = firstEvent;
                    dispatch(setText(payload.text));
                    dispatch(payload.peers.map(id => addPeerFromId(id)));
                }
                break;
            }
            case PEER_ADDITION: {
                dispatch(addPeer(peer.connect(firstEvent.data)));
                break;
            }
            case ADD_MESSAGE: {
                firstEvent.payload.date = new Date(firstEvent.payload.date);
                dispatch(firstEvent);
                break;
            }
            default: {
                dispatch(eventArray);
            }
        }
    });

    connection.on(PEER_ERROR, (err) => {
        console.log('ERROR', err);
        dispatch(removePeer(connection.peer));
        dispatch(deleteCursor(connection.peer));
    });

    connection.on(CONNECTION_CLOSE, () => {
        dispatch(removePeer(connection.peer));
        dispatch(deleteCursor(connection.peer));
    });

    return connection;
}

// Making peer injectable here to make it mockable and the function testable
// eslint-disable-next-line arrow-parens
const peersMiddleware = peer => store => next => action => {
    switch (action.type) {
        case INIT_PEER:
            peer.on(CONNECTION_EVENT, (connection) => {
                connection.open = true;
                const state = store.getState();

                const peers = state.peers.connections.map(conn => conn.peer);
                store.dispatch(addPeer(connection));

                store.dispatch(broadcastActionsToPeer(
                    connection.peer,
                    [handleInitials(peers, state.text)]
                ))
            });
            peer.on(CONNECTION_OPEN, (id) => {
                console.log('pid: ', id);
                store.dispatch([setPeerId(id), addMessage(createMessage("pid:", id))]);
            });
            break;
        case ADD_PEER_FROM_ID: {
            // Just modify action before eventifying connection
            const state = store.getState();
            if (action.payload === state.peers.id) break;
            action = addPeer(peer.connect(action.payload));
            // eslint-disable-next-line no-fallthrough
        }
        case ADD_PEER:
            next(addPeer(eventifyConnection(
                action.payload,
                store.dispatch,
                peer,
            )));
            break;
        case BROADCAST_ACTIONS:
            store.getState()
                .peers
                .connections
                .forEach(conn => conn.send(JSON.stringify(action.payload)));
            break;
        case BROADCAST_DATA_TO_PEER:
            store.getState().peers.connections
                .find(conn => conn.peer === action.payload.id)
                .send(JSON.stringify(action.payload.actions));
            break;
        default: next(action);
    }
};

export default peersMiddleware(localPeer);
