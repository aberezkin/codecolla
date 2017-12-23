import { Map, List } from 'immutable';
import reducer from '../text';
import { INSERT_LINE, REMOVE_LINE, SET_LINE, SET_TEXT } from '../../actions/index';

describe('text reducer', () => {
    const atoms = [
        { id: '1', text: 'a', time: 1 },
        { id: '2', text: 'b', time: 2 },
        { id: '3', text: 'c', time: 3 },
    ];

    const state = List(atoms.map(Map));

    it('should return initial value', () => {
        const initialState = reducer(undefined, {});
        expect(initialState).toBeInstanceOf(List);
        expect(initialState.size).toBe(0);
    });

    it(`should handle ${SET_TEXT} action`, () => {
        const action = {
            type: SET_TEXT,
            payload: atoms,
        };

        const newState = reducer(new List(), action);

        expect(newState).toBeInstanceOf(List);
        expect(newState.size).toBe(atoms.length);
        expect(newState.get(0)).toBeInstanceOf(Map);

        newState.forEach((atom, i) => expect(atom.equals(Map(atoms[i]))).toBe(true));
    });

    it(`should handle ${SET_LINE} action`, () => {
        const newAtom = { id: 'a', text: 'k', time: 3 };
        const action = {
            type: SET_LINE,
            payload: {
                line: 0,
                atom: newAtom,
            },
        };

        const newState = reducer(state, action);

        expect(newState.size).toBe(state.size);
        expect(newState.get(0).equals(Map(newAtom))).toBe(true);
    });

    it(`should handle ${INSERT_LINE} action`, () => {
        let newAtom = { id: 'a', text: 'k', time: 3 };
        const insertTo0 = {
            type: INSERT_LINE,
            payload: {
                line: 0,
                atom: newAtom,
            },
        };

        let newState = reducer(state, insertTo0);

        expect(newState.size).toBe(state.size + 1);
        expect(newState.get(0).equals(Map(newAtom))).toBe(true);
        expect(newState.get(1)).toBe(state.get(0));

        newAtom = { id: 'b', text: 'c', time: 5 };
        const insertTo2 = {
            type: INSERT_LINE,
            payload: {
                line: 2,
                atom: newAtom,
            },
        };

        newState = reducer(newState, insertTo2);

        expect(newState.size).toBe(state.size + 2);
        expect(newState.get(2).equals(Map(newAtom))).toBe(true);
        expect(newState.get(3)).toBe(state.get(1));
    });

    it(`should handle ${REMOVE_LINE} action`, () => {
        const remove0 = {
            type: REMOVE_LINE,
            payload: 0,
        };

        let newState = reducer(state, remove0);

        expect(newState.size).toBe(state.size - 1);
        expect(newState.get(0)).toBe(state.get(1));


        const remove1 = {
            type: REMOVE_LINE,
            payload: 1,
        };
        newState = reducer(state, remove1);

        expect(newState.size).toBe(state.size - 1);
        expect(newState.get(1)).toBe(state.get(2));
    });

    it('should return state on meaningless action', () => {
        expect(reducer(state, {})).toBe(state);
    });
});
