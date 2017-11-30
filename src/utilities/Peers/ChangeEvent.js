export const CURSOR_MOVE = 'CURSOR MOVE';
export const CHAT_MESSAGE = 'CHAT MESSAGE';
export const PEER_ADDITION = 'PEER ADDITION ';

class ChangeEvent {
    static getCursorMoveEvent(e) {
        return [{
            action: CURSOR_MOVE,
            peer: e.peer,
            pos: e.pos
        }]
    }

    static chatMessageEvent(e) {
        return [{
            action: CHAT_MESSAGE,
            text: this.event
        }]
    }

    static getAddPeerEvent(e) {
        return [{
            action: PEER_ADDITION,
            data: e
        }]
    }

    static getEditEvent(e) {
        return {
            action: e.action,
            startRow: e.start.row,
            startCol: e.start.column,
            endRow: e.end.row,
            endCol: e.end.column,
            text: e.lines
        }
    }
}

export default ChangeEvent;
