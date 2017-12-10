import reducer from './is-seed';
import {SET_IS_SEED} from "../actions/index";

describe('is seed reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toBe(false);
    });

    it(`should handle ${SET_IS_SEED} action with false payload`, () => {
        expect(reducer(true, {
            type: SET_IS_SEED,
            payload: false
        })).toBe(false);
    });

    it(`should handle ${SET_IS_SEED} action with true payload`, () => {
        expect(reducer(false, {
            type: SET_IS_SEED,
            payload: true
        })).toBe(true);
    });

    it('should return state on meaningless actions', () => {
        expect(reducer(false, {type: 'MEANINGLESS'})).toBe(false);
        expect(reducer(true, {type: 'MEANINGLESS'})).toBe(true);
    })
});