import '../utilities/Peerjs';
import { ADD_PEER, ADD_PEER_FROM_ID, addPeer, BROADCAST_ACTIONS, ADD_MESSAGE,
    BROADCAST_DATA_TO_PEER, INIT_PEER, removePeer, CONNECT_TO_ALL_PEERS, connectToAllPeers,
    setPeerId, sendAllText, broadcastActions, addPeerFromId, SET_CURSOR, deleteCursor, resetHistory } from '../actions/index';
import { DELETE_CURSOR, MOVE_CURSOR,
    ADD_CURSOR, PEER_ADDITION } from '../utilities/ChangeEvent';

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

const localPeer = new Peer({ key: 'e0twf5gs81lzbyb9' });
let sayHelloToOtherPeers = false;

function eventifyConnection(connection, dispatch, peer, store) {
    connection.on(CONNECTION_OPEN, () => {
        // TODO: migrate this to dispatch
        if (sayHelloToOtherPeers) {
            sayHelloToOtherPeers = false;
            dispatch(broadcastActions([connectToAllPeers(peer.id)]));
        }
    });

    connection.on(DATA_TRANSFER, (data) => {
        const eventArray = JSON.parse(data);
        const firstEvent = eventArray[0];
        // TODO: Send ONLY redux actions and just dispatch them
        switch (firstEvent.type) {
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
            case CONNECT_TO_ALL_PEERS: {
                dispatch(broadcastActions([addPeerFromId(firstEvent.payload)]));
                dispatch(sendAllText(connection.peer));
                break;
            }
            case ADD_MESSAGE: {
                firstEvent.payload.date = new Date(firstEvent.payload.date);
                dispatch(firstEvent);
                break;
            }
            default: {
                if (eventArray[0].isDirectAction)
                    store.getState().stepBack.history.otherUsersActionCnt += 1;
                else
                    store.getState().stepBack.history.otherUsersActionCnt -= 1;
                eventArray[0].isOtherUserAction = true;
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
            sayHelloToOtherPeers = action.payload.needAllPeers;
            if (store.getState()
                .peers
                .connections.find(peer => peer == action.payload.id)) {
                    break;
            }
            store.dispatch(resetHistory());
            action = addPeer(peer.connect(action.payload.id));
            // eslint-disable-next-line no-fallthrough
        case ADD_PEER:
            next(addPeer(eventifyConnection(
                action.payload,
                store.dispatch,
                peer,
                store
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
