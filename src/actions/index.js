import { buildActionsFromMappings } from 'react-redux-fetch';
import { generateAtom } from '../utilities/Helpers';

export function createSimpleAction(type) {
    return { type };
}

export function createAction(type, payload = undefined) {
    return { type, payload };
}


export const STEP_BACK_ADD_LINE_TO_SET = 'STEP BACK ADD LINE TO SET';
export function stepBackAddLineToSet(elem) {
    return createAction(STEP_BACK_ADD_LINE_TO_SET, elem)
}

export const STEP_BACK_DELETE_LINE_FROM_SET = 'STEP BACK DELETE LINE FROM SET';
export function stepBackDeleteLineFromSet(elem) {
    return createAction(STEP_BACK_DELETE_LINE_FROM_SET, elem)
}

export const STEP_BACK_CLEAR_SET = 'STEP BACK CLEAR SET';
export function stepBackClearSet(elem) {
    return createAction(STEP_BACK_CLEAR_SET, elem)
}

export const STEP_BACK_CHECK_ACTION = 'STEP BACK CHECK ACTION';
export function stepBackCheckAction(stepBack) {
    return createAction(STEP_BACK_CHECK_ACTION, stepBack)
}

export const STEP_BACK_CLEAR_ACTION = 'STEP BACK CLEAR ACTION';
export function stepBackClearAction(stepBack) {
    return createAction(STEP_BACK_CLEAR_ACTION, stepBack)
}

export const STEP_BACK_DELETE_ACTION = 'STEP BACK DELETE ACTION';
export function stepBackDeleteAction(stepBack) {
    return createAction(STEP_BACK_DELETE_ACTION, stepBack)
}

export const STEP_BACK_PREPARE_STACK = 'STEP BACK PREPARE STACK';
export function stepBackPrepareStack() {
    return createAction(STEP_BACK_PREPARE_STACK, true)
}

export const STEP_BACK_ADD_ACTION = 'STEP BACK ADD ACTION';
export function stepBackAddAction(action) {
    return createAction(STEP_BACK_ADD_ACTION, action)
}

export const RESET_HISTORY = 'RESET HISTORY';
export function resetHistory() {
    return createAction(RESET_HISTORY, true)
}

export const STEP_BACK_ACTION = 'STEP BACK ACTION';
export function stepBackAction() {
    return createAction(STEP_BACK_ACTION, true)
}

export const STEP_FORWARD_ACTION = 'STEP FORWARD ACTION';
export function stepForwardAction() {
    return createAction(STEP_FORWARD_ACTION, true)
}

export const STEP_FORWARD_RETURN_ACTION = 'STEP FORWARD RETURN ACTION';
export function stepForwardReturnAction() {
    return createAction(STEP_FORWARD_RETURN_ACTION, true)
}

/////////////////////////////////////////////////

export const SEND_ALL_TEXT = 'SENT ALL TEXT';
export function sendAllText(peerId) {
    return createAction(SEND_ALL_TEXT, peerId);
}

export const SET_PEER_ID = 'SET PEER ID';
export function setPeerId(id) {
    return createAction(SET_PEER_ID, id);
}

export const MOVE_CURSOR = 'MOVE CURSOR';
export function moveCursor(id, pos, name) {
    return createAction(MOVE_CURSOR, { id, pos, name });
}

export const ADD_CURSOR = 'ADD CURSOR';
export function addCursor(id, pos, name) {
    return createAction(ADD_CURSOR, {id, pos, name});
}

export const DELETE_CURSOR = 'DELETE CURSOR';
export function deleteCursor(pos) {
    return createAction(DELETE_CURSOR, pos);
}

export const SET_CURSOR = 'SET CURSOR';
export function setCursor(cursor) {
    return createAction(SET_CURSOR, cursor);
}

export const SET_IS_SEED = 'SET IS SEED';
export function setIsSeed(isSeed) {
    return createAction(SET_IS_SEED, isSeed);
}

export const SET_IS_TRANSFER_ALLOWED = 'SET IS TRANSFER ALLOWED';
export function setIsTransferAllowed(isTransferAllowed) {
    return createAction(SET_IS_TRANSFER_ALLOWED, isTransferAllowed);
}

export const SET_THEME = 'SET THEME';
export function setTheme(theme) {
    return createAction(SET_THEME, theme);
}

export const SET_LINEFEED = 'SET LINEFEED';
export function setLinefeed(linefeed) {
    return createAction(SET_LINEFEED, linefeed);
}

export const SET_ENCODING = 'SET ENCODING';
export function setEncoding(encoding) {
    return createAction(SET_ENCODING, encoding);
}

export const SET_LANGUAGE = 'SET LANGUAGE';
export function setLanguage(language) {
    return createAction(SET_LANGUAGE, language);
}

export const INIT_PEER = 'INIT PEER';
export function initPeer() {
    return createAction(INIT_PEER);
}

export const ADD_PEER = 'ADD PEER';
export function addPeer(connection) {
    return createAction(ADD_PEER, connection);
}

export const ADD_PEER_FROM_ID = 'ADD PEER FROM ID';
export function addPeerFromId(id) {
    return createAction(ADD_PEER_FROM_ID, id);
}

export const REMOVE_PEER = 'REMOVE PEER';
export function removePeer(connection) {
    return createAction(REMOVE_PEER, connection);
}

export const BROADCAST_ACTIONS = 'BROADCAST ACTIONS';
export function broadcastActions(actions) {
    if (!Array.isArray(actions))
        throw new Error('Expected actions to be an array');
    return createAction(BROADCAST_ACTIONS, actions);
}

export const BROADCAST_DATA_TO_PEER = 'BROADCAST DATA FOR PEER';
export function broadcastActionsToPeer(id, actions) {
    return createAction(BROADCAST_DATA_TO_PEER, {id, actions});
}

export const INSERT_EVENT = 'INSERT_EVENT';
export function insertEvent(event) {
    return createAction(INSERT_EVENT, event);
}

export const REMOVE_EVENT = 'REMOVE_EVENT';
export function removeEvent(event) {
    return createAction(REMOVE_EVENT, event);
}

export const SET_TEXT = 'SET TEXT';
export function setText(text) {
    let payload;
    if (typeof text === 'string')
        payload = text.split('\n').map(line => generateAtom(line, 1));
    else if (Array.isArray(text))
        payload = text;
    else
        throw new Error('Expected string or array as an argument');

    return createAction(SET_TEXT, payload);
}

export const SET_LINE = 'SET LINE';
export function setLine(line, atom) {
    if (typeof line !== 'number' || line < 0)
        throw new Error('Expected line to be a non negative number');
    return createAction(SET_LINE, { line, atom });
}

export const INSERT_LINE = 'INSERT LINE';
export function insertLine(line, atom) {
    if (typeof line !== 'number' || line < 0)
        throw new Error('Expected line to be a non negative number');
    return createAction(INSERT_LINE, { line, atom });
}

export const REMOVE_LINE = 'REMOVE LINE';
export function removeLine(line) {
    if (typeof line !== 'number' || line < 0)
        throw new Error('Expected line to be a non negative number');
    return createAction(REMOVE_LINE, line);
}

export const SEND_MESSAGE = 'SEND MESSAGE';
export function sendMessage(message) {
    return createAction(SEND_MESSAGE, message);
}

export const ADD_MESSAGE = 'ADD MESSAGE';
export function addMessage(message) {
    return createAction(ADD_MESSAGE, message);
}

export const ENTER_SESSION = 'ENTER SESSION';
export function enterSession(nickname) {
    return createAction(ENTER_SESSION, nickname);
}

// Reset to needed server-ip
export const SEND_URL = 'http://52.231.193.194:8080/compile';
export const COMPILE_CODE = 'COMPILE CODE';
export const RESOURCE_COMPILEBOX = 'compileBox';
export const RESOURCE_GIST = 'gist';

export function sendCode(langid, text) {
    return buildActionsFromMappings([{
        resource: RESOURCE_COMPILEBOX,
        method: 'post',
        request: {
            url: SEND_URL,
            body: {
                language: langid,
                code: text,
                stdin: '',
            },
        },
    }]).compileBoxPost();
}

export const GET_GIST = 'GET GIST';
export function getGist(gistId) {
    return buildActionsFromMappings([{
        resource: RESOURCE_GIST,
        method: 'get',
        request: {
            url: `https://api.github.com/gists/${gistId}`,
        },
    }]).gistGet();
}

export function handleMenuCommand(command) {
    return createAction(command, false);
}

export const TOGGLE_FULLSCREEN_SWITCH = 'TOGGLE FULLSCREEN SWITCH';
export function isFullMode(fs) {
    return createAction(TOGGLE_FULLSCREEN_SWITCH, fs);
}
export const TOGGLE_FULLSCREEN = 'TOGGLE FULLSCREEN';
export const TOGGLE_STATUS_BAR = 'TOGGLE STATUS BAR';
export const TOGGLE_CHAT = 'TOGGLE CHAT';
export const TOGGLE_INVITE_MODAL = 'TOGGLE INVITE MODAL';
export const TOGGLE_GIST_MODAL = 'TOGGLE GIST MODAL';
export const TOGGLE_URL_MODAL = 'TOGGLE URL MODAL';
export const TOGGLE_ABOUT_MODAL = 'TOGGLE ABOUT MODAL';
export const CREATE_NEW = 'CREATE NEW';
export const OPEN_SMTH = 'OPEN SMTH';
export const OPEN_URL = 'OPEN URL';
export function openUrl(urlText) {
    return createAction(OPEN_URL, urlText);
}
export const SAVE_AS = 'SAVE AS';
export const SAVE_ALL = 'SAVE ALL';
export const OPEN_SETTINGS = 'OPEN SETTINGS';
export const TOGGLE_SEARCH_BOX = 'TOGGLE SEARCH BOX';
export const OPEN_FILE = 'OPEN FILE';

export const COMPILE_RUBY = 'COMPILE RUBY';
export const COMPILE_CPP = 'COMPILE CPP';
export const GET_FULFIL = 'react-redux-fetch/GET_FULFIL';
export const GET_REJECT = 'react-redux-fetch/GET_REJECT';
export const POST_FULFIL = 'react-redux-fetch/POST_FULFIL';
export const POST_REJECT = 'react-redux-fetch/POST_REJECT';

export const SET_FILE = 'SET FILE';
export function onFileOpen(files) {
    return createAction(SET_FILE, files);
}

export const ADD_HOTKEY = 'ADD HOTKEY';
export function addHotKey(command, hotkey, handler) {
    return createAction(ADD_HOTKEY, {command, hotkey, handler});
}
