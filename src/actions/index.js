import { generateAtom } from '../utilities/Helpers';

function createAction(type, payload = undefined) {
    return { type, payload };
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
    return createAction(SET_TEXT, text.split('\n').map(line => generateAtom(line, 1)));
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

export function handleMenuCommand(command) {
    return createAction(command, false);
}

export const TOGGLE_STATUS_BAR = 'TOGGLE STATUS BAR';
export const TOGGLE_CHAT = 'TOGGLE CHAT';
export const CREATE_NEW = 'CREATE NEW';
export const OPEN_SMTH = 'OPEN SMTH';
export const OPEN_URL = 'OPEN URL';
export const SAVE_AS = 'SAVE AS';
export const SAVE_ALL = 'SAVE ALL';
export const OPEN_SETTINGS = 'OPEN SETTINGS';
