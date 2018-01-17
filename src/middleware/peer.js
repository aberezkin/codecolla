import '../utilities/Peerjs';
import { ADD_PEER, ADD_PEER_FROM_ID, CONNECT_TO_ALL_PEERS, connectToAllPeers,
    addPeer, BROADCAST_ACTIONS, INIT_PEER, removePeer, setPeerId,
    broadcastActions, addPeerFromId } from '../actions/index';
import ChangeEvent, { DELETE_CURSOR, MOVE_CURSOR, ADD_CURSOR, PEER_ADDITION } from '../utilities/ChangeEvent';

export const CONNECTION_EVENT = 'connection';
export const CONNECTION_OPEN = 'open';
export const CONNECTION_CLOSE = 'close';
export const DATA_TRANSFER = 'data';
export const PEER_ERROR = 'error';

const localPeer = new Peer({ key: 'e0twf5gs81lzbyb9' });
var sayHelloToOtherPeers = false;

function eventifyConnection(connection, dispatch, peer) {
    connection.on(CONNECTION_OPEN, () => {
        // TODO: migrate this to dispatch
        if (sayHelloToOtherPeers) {
            sayHelloToOtherPeers = false;
            dispatch(broadcastActions([connectToAllPeers(peer.id)]))
        }
    });

    connection.on(DATA_TRANSFER, (data) => {
        const eventArray = JSON.parse(data);
        const firstEvent = eventArray[0];
        // TODO: Send ONLY redux actions and just dispatch them
        switch (firstEvent.type) {
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
            case CONNECT_TO_ALL_PEERS: {
                dispatch(broadcastActions([addPeerFromId(firstEvent.payload)]));
                break;
            }
            default: {
                dispatch(eventArray);
            }
        }
    });

    connection.on(PEER_ERROR, (err) => {
        console.log('ERROR', err);
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
            sayHelloToOtherPeers = action.payload.needAllPeers;
            action = addPeer(peer.connect(action.payload.id));
            // eslint-disable-next-line no-fallthrough
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
        default: next(action);
    }
};

export default peersMiddleware(localPeer);
