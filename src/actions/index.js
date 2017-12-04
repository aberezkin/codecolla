export const SET_IS_SEED = 'SET IS SEED';
export const SET_IS_TRANSFER_ALLOWED = 'SET IS TRANSFER ALLOWED';

function createAction(type, payload) {
    return { type, payload }
}

export function setIsSeed(isSeed) {
    return createAction(SET_IS_SEED, isSeed)
}

export function setIsTransferAllowed(isTransferAllowed) {
    return createAction(SET_IS_TRANSFER_ALLOWED, isTransferAllowed);
}

export const SET_THEME    = 'SET THEME';
export const SET_LINEFEED = 'SET LINEFEED';
export const SET_ENCODING = 'SET ENCODING';
export const SET_LANGUAGE = 'SET LANGUAGE';

export function setTheme(theme) {
    return createAction(SET_THEME, theme);
}

export function setLinefeed(linefeed) {
    return createAction(SET_LINEFEED, linefeed);
}

export function setEncoding(encoding) {
    return createAction(SET_ENCODING, encoding);
}

export function setLanguage(language) {
    return createAction(SET_LANGUAGE, language);
}
