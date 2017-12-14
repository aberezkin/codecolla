import reducer from '../peer';
import {SET_PEER_ID} from "../../actions/index";

describe('peer id reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toBe("");
    });

    it(`should handle ${SET_PEER_ID} action with default payload`, () => {
        expect(reducer(true, {
            type: SET_PEER_ID,
            payload: "qwerty"
        })).toBe("qwerty");
    });

    it(`should handle ${SET_IS_SEED} action with not default payload`, () => {
        expect(reducer(false, {
            type: SET_IS_SEED,
            payload: "123456"
        })).toBe("123456");
    });
    
});