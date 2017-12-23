/* eslint-disable no-underscore-dangle */
import reducer from '../editor-preferences';
import { SET_ENCODING, SET_LANGUAGE, SET_LINEFEED, SET_THEME } from '../../actions/index';

// Using rewire to get not exported members
const theme = reducer.__get__('theme');
const language = reducer.__get__('language');
const linefeed = reducer.__get__('linefeed');
const encoding = reducer.__get__('encoding');

describe('theme reducer', () => {
    it('should return the initial state', () => {
        expect(theme(undefined, {})).toBe('monokai');
    });

    it(`should handle ${SET_THEME} action`, () => {
        expect(theme('monokai', {
            type: SET_THEME,
            payload: 'theme1',
        })).toBe('theme1');
    });

    it(`should handle ${SET_THEME} action with another payload`, () => {
        expect(theme('theme1', {
            type: SET_THEME,
            payload: 'theme2',
        })).toBe('theme2');
    });

    it('should return state on meaningless actions', () => {
        expect(theme('theme1', { type: 'MEANINGLESS' })).toBe('theme1');
    });
});

describe('language reducer', () => {
    it('should return the initial state', () => {
        expect(language(undefined, {})).toBe('javascript');
    });

    it(`should handle ${SET_LANGUAGE} action`, () => {
        expect(language('javascript', {
            type: SET_LANGUAGE,
            payload: 'language1',
        })).toBe('language1');
    });

    it(`should handle ${SET_LANGUAGE} action with another payload`, () => {
        expect(language('language1', {
            type: SET_LANGUAGE,
            payload: 'language2',
        })).toBe('language2');
    });

    it('should return state on meaningless actions', () => {
        expect(language('lang', { type: 'MEANINGLESS' })).toBe('lang');
    });
});

describe('linefeed reducer', () => {
    it('should return the initial state', () => {
        expect(linefeed(undefined, {})).toBe('LF');
    });

    it(`should handle ${SET_LINEFEED} action`, () => {
        expect(linefeed('CRLF', {
            type: SET_LINEFEED,
            payload: 'CR',
        })).toBe('CR');
    });

    it(`should handle ${SET_LINEFEED} action with another payload`, () => {
        expect(linefeed('CR', {
            type: SET_LINEFEED,
            payload: 'LF',
        })).toBe('LF');
    });

    it('should return state on meaningless actions', () => {
        expect(linefeed('LF', { type: 'MEANINGLESS' })).toBe('LF');
    });
});

describe('encoding reducer', () => {
    it('should return the initial state', () => {
        expect(encoding(undefined, {})).toBe('UTF-8');
    });

    it(`should handle ${SET_ENCODING} action`, () => {
        expect(encoding('UTF-8', {
            type: SET_ENCODING,
            payload: 'CP-866',
        })).toBe('CP-866');
    });

    it(`should handle ${SET_ENCODING} action with another payload`, () => {
        expect(encoding('CP-866', {
            type: SET_ENCODING,
            payload: 'CP-1255',
        })).toBe('CP-1255');
    });

    it('should return state on meaningless actions', () => {
        expect(encoding('UTF-8', { type: 'MEANINGLESS' })).toBe('UTF-8');
    });
});

