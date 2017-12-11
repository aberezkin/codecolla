import reducer from '../is-transfer-allowed';
import {SET_IS_TRANSFER_ALLOWED} from "../../actions/index";

describe('is transfer allowed reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toBe(true);
    });

    it(`should handle ${SET_IS_TRANSFER_ALLOWED} action with false payload`, () => {
        expect(reducer(true, {
            type: SET_IS_TRANSFER_ALLOWED,
            payload: false
        })).toBe(false);
    });

    it(`should handle ${SET_IS_TRANSFER_ALLOWED} action with true payload`, () => {
        expect(reducer(false, {
            type: SET_IS_TRANSFER_ALLOWED,
            payload: true
        })).toBe(true);
    });

    it('should return state on meaningless actions', () => {
        expect(reducer(false, {type: 'MEANINGLESS'})).toBe(false);
        expect(reducer(true, {type: 'MEANINGLESS'})).toBe(true);
    })
});