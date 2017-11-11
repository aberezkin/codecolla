import AceEditor from 'react-ace';


class ChangeEvent {
    constructor(newEvent) {
        this.event = newEvent;
    }

    packEventMoveCursor() {
        var e = {
            action: 'move',
            row: this.event.row,
            col: this.event.col
        };

        return JSON.stringify(e); 
    }

    packEventChatMsg() {
        var e = {
            action: 'chat',
            text: this.event
        };

        return JSON.stringify(e); 
    }

    packEventOnChange() {
        var e = {
            action: this.event.action,
            startRow: this.event.start.row, 
            startCol: this.event.start.column, 
            endRow: this.event.end.row,
            endCol: this.event.end.column,
            text: this.event.lines
        };

        return JSON.stringify(e);  
    }

    unpackEvent() {
        console.log('estr: ', this.event);
        return JSON.parse(this.event);  
    }
}

export default ChangeEvent;