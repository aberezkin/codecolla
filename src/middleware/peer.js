import '../utilities/Peerjs';
import { ADD_PEER, ADD_PEER_FROM_ID, addPeer, BROADCAST_ACTIONS, 
    GET_ALL_TEXT, BROADCAST_DATA_TO_PEER, INIT_PEER, removePeer,
    setPeerId, sendAllText, broadcastActions, addPeerFromId } from '../actions/index';
import ChangeEvent, 
    { CHAT_MESSAGE, DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION } from '../utilities/ChangeEvent'
import { SET_CURSOR } from '../actions/index'

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

const localPeer = new Peer({ key: 'e0twf5gs81lzbyb9' });

function eventifyConnection(connection, isSeed, dispatch, peer) {
    connection.on(CONNECTION_OPEN, () => {
        if (isSeed) {
            dispatch(sendAllText(connection.peer));
            dispatch(broadcastActions(addPeerFromId(connection.peer))); 
        }
    });

    connection.on(DATA_TRANSFER, (data) => {
        const eventArray = JSON.parse(data);
        const firstEvent = eventArray[0];

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
        dispatch(removePeer(connection));
    });

    connection.on(CONNECTION_CLOSE, () => {
        dispatch(removePeer(connection));
    });
       
    return connection;
}

// Making peer injectable here to make it mockable and the function testable
// eslint-disable-next-line arrow-parens
const peersMiddleware = peer => store => next => action => {
    switch (action.type) {
        case INIT_PEER:
            peer.on(CONNECTION_EVENT, connection => store.dispatch(addPeer(connection)));
            peer.on(CONNECTION_OPEN, (id) => {
                // eslint-disable-next-line no-console
                console.log('pid: ', id);
                store.dispatch(setPeerId(id));
            });
            break;
        case ADD_PEER_FROM_ID:
            // Just modify action before eventifying connection
            // eslint-disable-next-line no-param-reassign
            action = addPeer(peer.connect(action.payload));
            // eslint-disable-next-line no-fallthrough
        case ADD_PEER:
            next(addPeer(eventifyConnection(
                action.payload,
                store.getState().isSeed,
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
                .send(JSON.stringify(action.payload.broadcastedAction));
            break;
        default: next(action);
    }
};

export default peersMiddleware(localPeer);
