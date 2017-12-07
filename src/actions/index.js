import {generateAtom} from "../utilities/Helpers";
import {EDIT_INSERT, EDIT_REMOVE} from "../utilities/Peers/Peer";

function createAction(type, payload = undefined) {
    return { type, payload }
}

export const SET_IS_SEED = 'SET IS SEED';
export function setIsSeed(isSeed) {
    return createAction(SET_IS_SEED, isSeed)
}

export const SET_IS_TRANSFER_ALLOWED = 'SET IS TRANSFER ALLOWED';
export function setIsTransferAllowed(isTransferAllowed) {
    return createAction(SET_IS_TRANSFER_ALLOWED, isTransferAllowed);
}

export const SET_THEME    = 'SET THEME';
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

export const BROADCAST_DATA = 'BROADCAST DATA';
export function broadcastActions(data) {
    return createAction(BROADCAST_DATA, data);
}

export function insertEvent(event) {
    return createAction(EDIT_INSERT, event);
}

export function removeEvent(event) {
    return createAction(EDIT_REMOVE, event);
}

export const SET_TEXT = 'SET TEXT';
export function setText(text) {
    return createAction(SET_TEXT, text.split('\n').map(line => generateAtom(line, 1)));
}

export const SET_LINE = 'SET LINE';
export function setLine(line, atom) {
    return createAction(SET_LINE, {line, atom})
}

export const INSERT_LINE = 'INSERT LINE';
export function insertLine(line, atom) {
    return createAction(INSERT_LINE, {line, atom})
}

export const REMOVE_LINE = 'REMOVE LINE';
export function removeLine(line) {
    return createAction(REMOVE_LINE, line);
}
