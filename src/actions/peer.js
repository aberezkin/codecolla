import { createAction } from './index.js';

export const HANDLE_INITIALS = 'INITIALS';
export function handleInitials(peers, text) {
    return createAction(HANDLE_INITIALS, { peers, text });
}
