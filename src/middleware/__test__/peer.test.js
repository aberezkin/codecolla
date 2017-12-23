/* eslint-disable no-underscore-dangle */
import middleware, { CONNECTION_CLOSE, CONNECTION_EVENT, CONNECTION_OPEN, DATA_TRANSFER, PEER_ERROR } from '../peer';
import {
    ADD_PEER, ADD_PEER_FROM_ID, addPeer, addPeerFromId,
    BROADCAST_ACTIONS, broadcastActions, initPeer, removePeer, setPeerId,
} from '../../actions/index';

class ConnectionMock {
    constructor() {
        this.listeners = {};
        this.connect = jest.fn(() => new ConnectionMock());
        this.send = jest.fn();
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    triggerCallbacks(event, args = []) {
        if (!this.listeners[event]) return;

        this.listeners[event].forEach(callback => callback(...args));
    }

    isEventified() {
        return (
            this.listeners[CONNECTION_OPEN] &&
            this.listeners[DATA_TRANSFER] &&
            this.listeners[PEER_ERROR] &&
            this.listeners[CONNECTION_CLOSE]
        ) !== undefined;
    }
}

const eventifyConnection = middleware.__get__('eventifyConnection');

describe('eventifyConnection test', () => {
    const setup = (isSeed) => {
        let connection = new ConnectionMock();

        const dispatch = jest.fn();
        connection = eventifyConnection(connection, isSeed || false, dispatch);

        return {
            connection,
            dispatch,
        };
    };

    it('should dispatch remove peer on disconnect', () => {
        const { connection, dispatch } = setup();

        connection.triggerCallbacks(CONNECTION_CLOSE);

        expect(dispatch).toHaveBeenCalledWith(removePeer(connection));
    });

    it('should dispatch remove peer on error', () => {
        const { connection, dispatch } = setup();

        connection.triggerCallbacks(PEER_ERROR);

        expect(dispatch).toHaveBeenCalledWith(removePeer(connection));
    });

    // TODO: implement after isSeed bug fix
    it('should dispatch broadcast actions with new peer if is seed');
    // TODO: implement when all data transferred to peers is pure actions
    it('should dispatch actions as is on DATA_TRANSFER');
});

const peersMiddleware = middleware.__get__('peersMiddleware');

describe('peers middleware', () => {
    const setup = (connections = []) => {
        const store = {
            getState: jest.fn(() => ({
                isSeed: false,
                peers: { connections },
            })),
            dispatch: jest.fn(),
        };

        const next = jest.fn();

        const peer = new ConnectionMock();
        const finalMiddleware = peersMiddleware(peer);

        const invoke = action => finalMiddleware(store)(next)(action);

        return { peer, store, next, invoke };
    };

    it(`should dispatch add peer on ${CONNECTION_EVENT}`, () => {
        const { peer, store, next, invoke } = setup();
        const action = initPeer();

        invoke(action);
        expect(next).not.toHaveBeenCalled();

        const newConnection = new ConnectionMock();
        peer.triggerCallbacks(CONNECTION_EVENT, [newConnection]);

        expect(store.dispatch).toHaveBeenCalledWith(addPeer(newConnection));
    });

    it(`should dispatch set peer id on ${CONNECTION_OPEN}`, () => {
        const { peer, store, next, invoke } = setup();
        const action = initPeer();

        invoke(action);
        expect(next).not.toHaveBeenCalled();

        const id = 'hello';

        peer.triggerCallbacks(CONNECTION_OPEN, [id]);

        expect(store.dispatch).toHaveBeenCalledWith(setPeerId(id));
    });

    it(`should eventify connection on ${ADD_PEER} before passing it to reducers`, () => {
        const { next, invoke } = setup();

        const newConnection = new ConnectionMock();
        const action = addPeer(newConnection);

        invoke(action);

        expect(newConnection.isEventified()).toEqual(true);
        expect(next).toHaveBeenCalledWith(addPeer(newConnection));
    });

    it(`should modify ${ADD_PEER_FROM_ID} action and dispatch it as ${ADD_PEER}`, () => {
        const { peer, invoke } = setup();
        const id = 'hello';
        const action = addPeerFromId(id);

        invoke(action);

        expect(peer.connect).toHaveBeenCalledWith(id);
    });

    it(`should handle ${BROADCAST_ACTIONS} action`, () => {
        const connections = [
            new ConnectionMock(),
            new ConnectionMock(),
            new ConnectionMock(),
            new ConnectionMock(),
        ];
        const { next, invoke } = setup(connections);
        const broadcastedActions = [initPeer(), addPeerFromId('hello')];
        const action = broadcastActions(broadcastedActions);

        invoke(action);

        expect(next).not.toHaveBeenCalled();

        const stringifiedBroadcastedActions = JSON.stringify(broadcastedActions);
        connections
            .forEach(conn => expect(conn.send).toHaveBeenCalledWith(stringifiedBroadcastedActions));
    });
});
