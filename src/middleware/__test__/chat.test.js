import { ADD_MESSAGE, BROADCAST_ACTIONS, SEND_MESSAGE } from '../../actions/index';
import middleware from '../chat';

const create = () => {
    const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
    };
    const next = jest.fn();

    const invoke = action => middleware(store)(next)(action);

    return { store, next, invoke };
};

describe('chat middleware', () => {
    it(`passes through non ${SEND_MESSAGE} action`, () => {
        const { next, invoke } = create();
        const action = { type: 'TEST' };

        invoke(action);
        expect(next).toHaveBeenCalledWith(action);
    });

    it(`turns ${SEND_MESSAGE} to ${ADD_MESSAGE} and dispatches broadcast`, () => {
        const { store, invoke } = create();
        const message = { author: 'me', content: 'Hello!', date: new Date().toLocaleTimeString() };
        const action = {
            type: SEND_MESSAGE,
            payload: message,
        };

        invoke(action);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: BROADCAST_ACTIONS,
            payload: [{ type: ADD_MESSAGE, payload: action.payload }],
        });
    });

    it(`turns ${SEND_MESSAGE} to ${ADD_MESSAGE} and passes it to next`, () => {
        const { next, invoke } = create();
        const message = { author: 'me', content: 'Hello!', date: new Date().toLocaleTimeString() };
        const action = {
            type: SEND_MESSAGE,
            payload: message,
        };

        invoke(action);
        expect(next).toHaveBeenCalledWith({ type: ADD_MESSAGE, payload: action.payload });
    });
});

