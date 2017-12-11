import middleware from './text';
import {Map} from 'immutable';

const insertTextToAtom = middleware.__get__('insertTextToAtom');
const removeTextFromAtom = middleware.__get__('removeTextFromAtom');

describe('insert text to atom', () => {
    let atom = new Map({id: 'a', text: 'aaa', time: 1});

    it('should insert text in the beginning of atom\'s text', () => {
        let newAtom = insertTextToAtom(atom, 0, 'bbb');
        expect(newAtom.get('id')).toBe('a');
        expect(newAtom.get('text')).toBe('bbbaaa');
    });

    it('should insert text in the ending of atom\'s text', () => {
        let newAtom = insertTextToAtom(atom, Number.MAX_VALUE, 'bbb');
        expect(newAtom.get('id')).toBe('a');
        expect(newAtom.get('text')).toBe('aaabbb');
    });

    it('should insert text somewhere in the middle of atom\'s text', () => {
        let newAtom = insertTextToAtom(atom, 1, 'bbb');
        expect(newAtom.get('id')).toBe('a');
        expect(newAtom.get('text')).toBe('abbbaa');
    })
});

describe('remove text from atom', () => {
    let atom = new Map({id: 'a', text: 'aaabbbaaa', time: 1});

    it('should remove all text by default', () => {
        let newAtom = removeTextFromAtom(atom);
        expect(newAtom.get('id')).toBe('a');
        expect(newAtom.get('text').length).toBe(0);
    });

    it('should remove text from the beginning of atom\'s text', () => {
        let newAtom = removeTextFromAtom(atom, 0, 3);
        expect(newAtom.get('text').length).toBe(atom.get('text').length - 3);
        expect(newAtom.get('text')).toBe('bbbaaa');
    });

    it('should remove text from specified start to unspecified end', () => {
        let newAtom = removeTextFromAtom(atom, 6);
        expect(newAtom.get('text').length).toBe(atom.get('text').length - 3);
        expect(newAtom.get('text')).toBe('aaabbb');
    });

    it('should remove text from specified start to specified end', () => {
        let newAtom = removeTextFromAtom(atom, 3, 6);
        expect(newAtom.get('text').length).toBe(atom.get('text').length - 3);
        expect(newAtom.get('text')).toBe('aaaaaa');
    })
});
