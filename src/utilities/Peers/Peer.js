import './Peerjs.js';

import ChangeEvent, {ADD_CURSOR, CHAT_MESSAGE, DELETE_CURSOR, MOVE_CURSOR, PEER_ADDITION} from './ChangeEvent';

const CONNECTION_EVENT = 'connection';
const CONNECTION_OPEN = 'open';
const CONNECTION_CLOSE = 'close';
const DATA_TRANSFER = 'data';
const PEER_ERROR = 'error';

export const EDIT_INSERT = 'insert';
export const EDIT_REMOVE = 'remove';
export const EDIT_REPLACE = 'replace';

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

	setEditEventHandler(eventHandler) {
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
            if (this.getCheckboxStatus.call()) {
                this.broadcastEvent(ChangeEvent.getAddPeerEvent(connection.peer));
            }

            this.connections.push(connection);
        });

        this.setEventHandlers(connection);
    }

    setEventHandlers(connection) {
        connection.on(DATA_TRANSFER, (data) => {
            let unpackedEventArray = JSON.parse(data);
            let unpackedEvent = unpackedEventArray[0];

            switch (unpackedEvent.action) {
                case CHAT_MESSAGE: {
                    console.log(connection.peer + ": " + unpackedEvent.text);
                    break;
                }
                case DELETE_CURSOR:
                case MOVE_CURSOR:
                case ADD_CURSOR: {
                    this.cursorEventHandler({
                        type: unpackedEvent.action,
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
    }

    getConnect(id) {
        let connection = this.peer.connect(id);
        this.handleConnection(connection);
		this.cursorEventHandler({
					type: ADD_CURSOR,
					peerId: connection.peer,
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

    broadcastEvent(event) {
        this.connections.forEach(conn => conn.send(JSON.stringify(event)));
    }

    broadcastMessage(msg) {
		this.connections.forEach(conn => conn.send(msg));
    }
}

export default PeerControl;