import { SET_IS_SEED, SET_LINEFEED, SET_IS_TRANSFER_ALLOWED,
    SET_ENCODING, SET_LANGUAGE, SET_THEME, INIT_PEER,
    ADD_PEER_FROM_ID, ADD_PEER, REMOVE_PEER, BROADCAST_ACTIONS,
    INSERT_EVENT, REMOVE_EVENT, REMOVE_LINE,
    SEND_MESSAGE, ADD_MESSAGE, SET_LINE, INSERT_LINE, setIsSeed,
    setIsTransferAllowed, setLinefeed, setEncoding,
    setLanguage, setTheme, addPeer, addPeerFromId, removePeer,
    insertEvent, removeEvent, removeLine, sendMessage,
    addMessage, broadcastActions, initPeer, setLine, insertLine } from './index';

const testSyncActionCreator = (actionCreator, payload, expectedValue) => {
    it(`should create ${expectedValue.type} action`, () => {
        expect(actionCreator(payload)).toEqual(expectedValue);
    });
};

const testPayloadActionCreator = (actionCreator, type, payload) =>
    testSyncActionCreator(actionCreator, payload, { type, payload });

describe('simple payload action creators', () => {
    testPayloadActionCreator(setIsSeed, SET_IS_SEED, false);
    testPayloadActionCreator(setIsSeed, SET_IS_SEED, true);
    testPayloadActionCreator(setIsTransferAllowed, SET_IS_TRANSFER_ALLOWED, false);
    testPayloadActionCreator(setIsTransferAllowed, SET_IS_TRANSFER_ALLOWED, true);
    testPayloadActionCreator(setLinefeed, SET_LINEFEED, 'LF');
    testPayloadActionCreator(setLinefeed, SET_LINEFEED, 'CRLF');
    testPayloadActionCreator(setEncoding, SET_ENCODING, 'UTF-8');
    testPayloadActionCreator(setEncoding, SET_ENCODING, 'CP-1255');
    testPayloadActionCreator(setLanguage, SET_LANGUAGE, 'javascript');
    testPayloadActionCreator(setLanguage, SET_LANGUAGE, 'scala');
    testPayloadActionCreator(setTheme, SET_THEME, 'monokai');
    testPayloadActionCreator(setTheme, SET_THEME, 'cobalt');
    testPayloadActionCreator(addPeer, ADD_PEER, { connection: 'mock' });
    testPayloadActionCreator(addPeerFromId, ADD_PEER_FROM_ID, 'peerid');
    testPayloadActionCreator(removePeer, REMOVE_PEER, { connection: 'mock' });
    testPayloadActionCreator(insertEvent, INSERT_EVENT, { event: 'mock' });
    testPayloadActionCreator(removeEvent, REMOVE_EVENT, { event: 'mock' });
    testPayloadActionCreator(removeLine, REMOVE_LINE, 4);
    testPayloadActionCreator(sendMessage, SEND_MESSAGE, { message: 'mock' });
    testPayloadActionCreator(addMessage, ADD_MESSAGE, { message: 'mock' });
    testPayloadActionCreator(broadcastActions, BROADCAST_ACTIONS, [removeLine(4)]);

    testSyncActionCreator(initPeer, null, { type: INIT_PEER });
});

describe('several arguments actions', () => {
    it(`should create ${SET_LINE} action`, () => {
        const expectedValue = {
            type: SET_LINE,
            payload: {
                line: 3,
                atom: { atom: 'mock' },
            },
        };

        expect(setLine(3, { atom: 'mock' })).toEqual(expectedValue);
    });

    it(`should create ${INSERT_LINE} action`, () => {
        const expectedValue = {
            type: INSERT_LINE,
            payload: {
                line: 3,
                atom: { atom: 'mock' },
            },
        };

        expect(insertLine(3, { atom: 'mock' })).toEqual(expectedValue);
    });
});

describe('throws from action creators', () => {
    it('should throw an error when "actions" is not array in broadcastActions', () => {
        expect(() => broadcastActions(removeLine(4))).toThrow();
    });

    it('should throw an error when "line" is not a number in atomic actions', () => {
        expect(() => removeLine('4')).toThrow();
        expect(() => insertLine('4', { atom: 'mock' })).toThrow();
        expect(() => setLine('4', { atom: 'mock' })).toThrow();
    });
});

// TODO: test SET_TEXT action creator
