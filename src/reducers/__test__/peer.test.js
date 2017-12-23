import reducer from '../peer';
import {SET_PEER_ID, ADD_PEER, REMOVE_PEER} from "../../actions/index";


const connectionsReducer = reducer.__get__('connectionsReducer');
const idReducer = reducer.__get__('idReducer');

describe('connections reducer', () => {
    const connections = [
        { peer: '1', connection: 'mock' },
        { peer: '2', connection: 'mock' },
        { peer: '3', connection: 'mock' },
    ];

    it('should return initial value', () => {
        const initialState = connectionsReducer(undefined, {});

        expect(initialState).toBeInstanceOf(Array);
        expect(initialState.length).toBe(0);
    });

    it(`should handle ${ADD_PEER} action`, () => {
        const newPeer = { peer: 'a', connection: 'mock' };
        const action = { type: ADD_PEER, payload: newPeer };
        const newState = connectionsReducer(connections, action);

        expect(newState).toBeInstanceOf(Array);
        expect(newState.length).toBe(connections.length + 1);
        expect(newState[newState.length - 1]).toBe(newPeer);
        expect(newState[newState.length - 2]).toBe(connections[connections.length - 1]);
    });

    it(`should handle ${REMOVE_PEER} action`, () => {
        const action = { type: REMOVE_PEER, payload: connections[1] };
        const newState = connectionsReducer(connections, action);

        expect(newState).toBeInstanceOf(Array);
        expect(newState.length).toBe(connections.length - 1);
        expect(newState[1]).toBe(connections[2]);
    });

    it('should return same state on meaningless action', () => {
        expect(connectionsReducer(connections, {})).toBe(connections);
    });
});
describe('peer id reducer', () => {
    it('should return the initial state', () => {
        expect(idReducer(undefined, {})).toBe("");
    });

    it(`should handle ${SET_PEER_ID} action with default payload`, () => {
        expect(idReducer(null, {
            type: SET_PEER_ID,
            payload: "qwerty"
        })).toBe("qwerty");
    });

    it(`should handle ${SET_PEER_ID} action with not default payload`, () => {
        expect(idReducer("qwerty", {
            type: SET_PEER_ID,
            payload: "123456"
        })).toBe("123456");
    });
    
    it('should return same state on meaningless action', () => {
        expect(idReducer("qwerty", {})).toBe("qwerty");
    });
});
