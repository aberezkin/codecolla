import AceEditor from 'react-ace';


class ChangeEvent {
    constructor(newEvent) {
        this.event = newEvent;
    }

    packEventMoveCursor() {
        let sendPack = [];
        sendPack.push(JSON.stringify({
            action: 'move',
            peer: this.event.peer,
            pos: this.event.pos
        }));

        return sendPack; 
    }

    packEventChatMsg() {
        let sendPack = [];
        sendPack.push(JSON.stringify({
            action: 'chat',
            text: this.event
        }));

        return sendPack; 
    }

    packEventNewPeer() {
        let sendPack = [];
        sendPack.push(JSON.stringify({
            action: 'addpeer',
            data: this.event
        }));

        return sendPack; 
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
    
    unpackEventArray() {
        console.log('estr: ', this.event);
        let res = [];
        for (var i = 0; i < this.event.length; ++i) {
            console.log('estr: ', this.event[i]);
            res.push(JSON.parse(this.event[i]));
        }
        return res;  
    }
}

export default ChangeEvent;