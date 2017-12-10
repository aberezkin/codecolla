import reducer from './peer';
import {ADD_PEER, REMOVE_PEER} from "../actions/index";

const connectionsReducer = reducer.__get__('peersReducer');

describe('connections reducer', () => {
    let connections = [
        {peer: '1', connection: 'mock'},
        {peer: '2', connection: 'mock'},
        {peer: '3', connection: 'mock'}
    ];

    it('should return initial value', () => {
        let initialState = connectionsReducer(undefined, {});

        expect(initialState).toBeInstanceOf(Array);
        expect(initialState.length).toBe(0);
    });

    it(`should handle ${ADD_PEER} action`, () => {
        let newPeer = {peer: 'a', connection: 'mock'};
        let action = {type: ADD_PEER, payload: newPeer};
        let newState = connectionsReducer(connections, action);

        expect(newState).toBeInstanceOf(Array);
        expect(newState.length).toBe(connections.length + 1);
        expect(newState[newState.length - 1]).toBe(newPeer);
        expect(newState[newState.length - 2]).toBe(connections[connections.length - 1]);
    });

    it(`should handle ${REMOVE_PEER} action`, () => {
        let action = {type: REMOVE_PEER, payload: connections[1]};
        let newState = connectionsReducer(connections, action);

        expect(newState).toBeInstanceOf(Array);
        expect(newState.length).toBe(connections.length - 1);
        expect(newState[1]).toBe(connections[2]);
    });

    it('should return same state on meaningless action', () => {
        expect(connectionsReducer(connections, {})).toBe(connections);
    });
});