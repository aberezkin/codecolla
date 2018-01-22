import { CONNECT_TO_ALL_PEERS, SET_LINEFEED, SET_IS_TRANSFER_ALLOWED,
    SET_ENCODING, SET_LANGUAGE, SET_THEME, INIT_PEER,
    ADD_PEER_FROM_ID, ADD_PEER, REMOVE_PEER, BROADCAST_ACTIONS,
    INSERT_EVENT, REMOVE_EVENT, REMOVE_LINE, connectToAllPeers,
    SEND_MESSAGE, ADD_MESSAGE, SET_LINE, SET_TEXT, INSERT_LINE,
    MOVE_CURSOR, ADD_CURSOR, DELETE_CURSOR, SET_CURSOR, SEND_ALL_TEXT,
    BROADCAST_DATA_TO_PEER, broadcastActionsToPeer,
    moveCursor, addCursor, deleteCursor, setCursor, sendAllText,
    setIsTransferAllowed, setLinefeed, setEncoding,
    setLanguage, setTheme, addPeer, addPeerFromId, removePeer,
    insertEvent, removeEvent, removeLine, sendMessage,
    addMessage, broadcastActions, initPeer, setLine, setText, insertLine,
    sendCode, handleMenuCommand, SEND_URL } from './index';

const testSyncActionCreator = (actionCreator, payload, expectedValue) => {
    it(`should create ${expectedValue.type} action`, () => {
        expect(actionCreator(payload)).toEqual(expectedValue);
    });
};

const testPayloadActionCreator = (actionCreator, type, payload) =>
    testSyncActionCreator(actionCreator, payload, { type, payload });

describe('simple payload action creators', () => {
    testPayloadActionCreator(connectToAllPeers, CONNECT_TO_ALL_PEERS, false);
    testPayloadActionCreator(connectToAllPeers, CONNECT_TO_ALL_PEERS, true);
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

describe('set text action', () => {
    it(`should create ${SET_TEXT} action with string`, () => {
        expect(Array.isArray(setText('first\n second').payload)).toEqual(Array.isArray([]));
    });

    it(`should create ${SET_TEXT} action with array`, () => {
        expect(Array.isArray(setText([]).payload)).toEqual(Array.isArray([]));
    });

    it(`should create ${SET_TEXT} action with trash`, () => {
        expect(() => setText(1999)).toThrow();
    });
});

describe('test cursor actions', () => {
    it(`should create ${MOVE_CURSOR} action`, () => {
        expect(moveCursor(1, { row: 1, col: 1 })).toEqual({ type: MOVE_CURSOR,
            payload: {
                id: 1,
                pos: { row: 1, col: 1 },
            } });
    });

    it(`should create ${ADD_CURSOR} action`, () => {
        expect(addCursor({ row: 1, col: 1 })).toEqual({
            type: ADD_CURSOR, payload: { row: 1, col: 1 },
        });
    });
    it(`should create ${DELETE_CURSOR} action`, () => {
        expect(deleteCursor({ row: 1, col: 1 })).toEqual({
            type: DELETE_CURSOR, payload: { row: 1, col: 1 },
        });
    });
    it(`should create ${SET_CURSOR} action`, () => {
        expect(setCursor({ row: 1, col: 1 })).toEqual({
            type: SET_CURSOR, payload: { row: 1, col: 1 },
        });
    });
});

describe('test send all text action', () => {
    const eq = {
        type: SEND_ALL_TEXT,
        payload: 1,
    };
    it(`should create ${SEND_ALL_TEXT} action`, () => {
        expect(sendAllText(1)).toEqual(eq);
    });
});

describe('test broadcast data to peer action', () => {
    const eq = {
        type: BROADCAST_DATA_TO_PEER,
        payload: 'qwerty',
    };
    it(`should create ${BROADCAST_DATA_TO_PEER} action`, () => {
        expect(broadcastActionsToPeer('qwerty')).toEqual(eq);
    });
});

describe('test handleMenuCommand action', () => {
    const eq = {
        type: 'qwerty',
        payload: false,
    };
    expect(handleMenuCommand('qwerty')).toEqual(eq);
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

    const POST_REQUEST = 'react-redux-fetch/POST_REQUEST';
    it(`should create ${POST_REQUEST} action`, () => {
        const expectedValue = {
            type: POST_REQUEST,
            method: 'post',
            resource: {
                name: 'compileBox',
            },
            request: {
                url: SEND_URL,
                body: {
                    code: 'puts [123]\n',
                    language: 1,
                    stdin: '',
                },
            },
        };

        expect(sendCode(1, 'puts [123]\n')).toEqual(expectedValue);
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
