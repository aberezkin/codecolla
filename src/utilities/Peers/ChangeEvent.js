export const CURSOR_MOVE = 'CURSOR MOVE';
export const CHAT_MESSAGE = 'CHAT MESSAGE';
export const PEER_ADDITION = 'PEER ADDITION ';

class ChangeEvent {
    constructor(newEvent) {
        this.event = newEvent;
    }

    packCursorMoveEvent() {
        return [JSON.stringify({
            action: CURSOR_MOVE,
            peer: this.event.peer,
            pos: this.event.pos
        })];
    }

    packChatMessageEvent() {
        return [JSON.stringify({
            action: CHAT_MESSAGE,
            text: this.event
        })];
    }

    packAddPeerEvent() {
        return [JSON.stringify({
            action: PEER_ADDITION,
            data: this.event
        })];
    }

    packEditEvent() {
        return JSON.stringify({
            action: this.event.action,
            startRow: this.event.start.row,
            startCol: this.event.start.column,
            endRow: this.event.end.row,
            endCol: this.event.end.column,
            text: this.event.lines
        });
    }

    unpackEvent() {
        return JSON.parse(this.event);  
    }
    
    unpackEventArray() {
        return this.event.map(JSON.parse);
    }
}

export default ChangeEvent;
