export const SET_IS_SEED = 'SET IS SEED';
export const SET_IS_TRANSFER_ALLOWED = 'SET IS TRANSFER ALLOWED';

export function setIsSeed(isSeed) {
    return { type: SET_IS_SEED, payload: isSeed }
}

export function setIsTransferAllowed(isTransferAllowed) {
    return { type: SET_IS_TRANSFER_ALLOWED, payload: isTransferAllowed };
}

