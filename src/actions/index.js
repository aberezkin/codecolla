import {generateAtom} from "../utilities/Helpers";
import {EDIT_INSERT, EDIT_REMOVE} from "../components/Editor/Editor";

function createAction(type, payload = undefined) {
    return { type, payload }
}

export const GET_ALL_TEXT = 'GET ALL TEXT';

export const SEND_ALL_TEXT = 'SENT ALL TEXT';
export function sendAllText(peerId) {
    return createAction(SEND_ALL_TEXT, peerId);
}

export const SET_PEER_ID = 'SET PEER ID';
export function setPeerId(id) {
    return createAction(SET_PEER_ID, id);
}

export const MOVE_CURSOR = 'MOVE CURSOR';
export function moveCursor(id, pos) {
    return createAction(MOVE_CURSOR, {id, pos});
}

export const ADD_CURSOR = 'ADD CURSOR';
export function addCursor(pos) {
    return createAction(ADD_CURSOR, pos);
}

export const DELETE_CURSOR = 'DELETE CURSOR';
export function deleteCursor(pos) {
    return createAction(DELETE_CURSOR, pos);
}

export const SET_CURSOR = 'SET CURSOR';
export function setCursor(pos) {
    return createAction(SET_CURSOR, pos);
}

export const SET_IS_SEED = 'SET IS SEED';
export function setIsSeed(isSeed) {
    return createAction(SET_IS_SEED, isSeed);
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

export const BROADCAST_DATA_FOR_PEER = 'BROADCAST DATA FOR PEER';
export function broadcastActionsForPeer(data) {
    return createAction(BROADCAST_DATA_FOR_PEER, data);
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
