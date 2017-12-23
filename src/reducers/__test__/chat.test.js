/* eslint-disable no-underscore-dangle */
import reducer from '../chat';
import { ADD_MESSAGE } from '../../actions/index';

const messages = reducer.__get__('messages');

describe('messages reducer', () => {
    const state = [
        { author: 'me', content: 'Hello!', date: new Date().toLocaleTimeString() },
        { author: 'you', content: 'Hi!', date: new Date().toLocaleTimeString() },
        { author: 'me', content: 'How are you?', date: new Date().toLocaleTimeString() },
    ];

    it('should return default value', () => {
        expect(messages(undefined, {})).toEqual([]);
    });

    it(`should handle ${ADD_MESSAGE} action`, () => {
        const message = {
            author: 'you',
            content: 'Fine, let\'s code!',
            date: new Date().toLocaleTimeString(),
        };

        const newState = messages(state, { type: ADD_MESSAGE, payload: message });
        expect(newState.length).toBe(state.length + 1);
        expect(newState[newState.length - 1]).toEqual(message);
    });

    it('should return same state on meaningless action', () => {
        expect(messages(state, {})).toBe(state);
    });
});

