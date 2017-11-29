import './Peerjs.js';

import ChangeEvent, {CHAT_MESSAGE, CURSOR_MOVE, PEER_ADDITION} from './ChangeEvent';

const CONNECTION_EVENT = 'connection';
const CONNECTION_OPEN = 'open';
const CONNECTION_CLOSE = 'close';
const DATA_TRANSFER = 'data';
const PEER_ERROR = 'error';

export const ADD_CURSOR = "ADD_CURSOR";
export const DELETE_CURSOR = "DELETE_CURSOR";
export const MOVE_CURSOR = "MOVE_CURSOR";

class PeerControl {
    constructor() {
        this.ID = '';
        this.peer = new Peer({key: 'e0twf5gs81lzbyb9', debug: true});
        this.connections = [];

        this.handleConnection = this.handleConnection.bind(this);
        this.getConnect = this.getConnect.bind(this);
        this.broadcastMessage = this.broadcastMessage.bind(this);
        
        this.peer.on(CONNECTION_OPEN, (id) => {
            this.ID = id;
            console.log('pid: ', id);
        });  
          
        this.peer.on(CONNECTION_EVENT, (conn) => this.handleConnection(conn));
    }

	setEventHandler(eventHandler) {
		this.eventHandler = eventHandler;
	}
	
	setCursorEventHandler(cursorEventHandler) {
		this.cursorEventHandler = cursorEventHandler;
    }
    
    setCheckboxStatusHandler(checkboxStatusHandler) {
		this.getCheckboxStatus = checkboxStatusHandler;
	}

    handleConnection(connection) {
        connection.on(CONNECTION_OPEN, () => {
            console.log("Connected with peer: ",this.getCheckboxStatus);
            console.log('CHECKBOX status',this.getCheckboxStatus());

            if (this.getCheckboxStatus.call()) {
                let evnt = new ChangeEvent(connection.peer);
                let strEvnt = evnt.packAddPeerEvent();
                this.broadcastMessage(strEvnt);
            }
			
            connection.on(DATA_TRANSFER, (data) => {
                let event = new ChangeEvent(data);
                let unpackedEventArray = event.unpackEventArray();
                let unpackedEvent = unpackedEventArray[0];
                switch (unpackedEvent.action) {
                    case CHAT_MESSAGE: {
                        console.log(connection.peer + ": " + unpackedEvent.text);
                        break;
                    }
                    case CURSOR_MOVE: {
                        this.cursorEventHandler({
                            type: MOVE_CURSOR,
                            peerId: unpackedEvent.peer,
                            position: unpackedEvent.pos
                        });
                        break;
                    }
                    case PEER_ADDITION: {
                        this.getConnect(unpackedEvent.data);
                        break;
                    }
                    default: {
                        console.log(this.eventHandler);
                        this.eventHandler(unpackedEventArray);
                    }
                }
            });
			
            connection.on(PEER_ERROR, () => {
                alert(connection.peer + ' : ERROR.');
				this.removeConnection(connection);
            });

            connection.on(CONNECTION_CLOSE, (err) => {
                alert(connection.peer + ' has left the chat.');
                this.removeConnection(connection);
            });
            
            this.connections.push(connection);
        });
    }

    getConnect(id) {
        let conn = this.peer.connect(id);
        this.handleConnection(conn);
		this.cursorEventHandler({
					type: ADD_CURSOR,
					peerId: conn.peer,
					position: {row: 0, column: 0}
        });
    }

    removeConnection(connection) {
        this.cursorEventHandler({
            type: DELETE_CURSOR,
            peerId: connection.peer
        });
        this.connections = this.connections.filter(conn => conn.peer !== connection.peer);
    }

    broadcastMessage(msg) {
		this.connections.forEach(conn => conn.send(msg));
    }
}

export default PeerControl;