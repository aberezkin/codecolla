import './Peerjs.js';

import ChangeEvent from './ChangeEvent';


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
        
        this.peer.on('open', (id) => {
            this.ID = id;
            console.log('pid: ', id);
        });  
          
        this.peer.on('connection', (conn) => this.handleConnection(conn));
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
        connection.on('open', () => {
            console.log("Connected with peer: ",this.getCheckboxStatus);
            console.log('CHECKBOX status',this.getCheckboxStatus());

            if (this.getCheckboxStatus.call()) {
                let evnt = new ChangeEvent(connection.peer);
                let strEvnt = evnt.packEventNewPeer();
                this.broadcastMessage(strEvnt);
            }
			
            connection.on('data', (data) => {
                let event = new ChangeEvent(data);
                let unpackedEvent = event.unpackEventArray();
                switch (unpackedEvent[0].action) {
                    case 'chat': {
                        console.log(connection.peer + ": " + unpackedEvent.text);
                        break;
                    }
                    case 'move': {
                        this.cursorEventHandler({
                            type: MOVE_CURSOR,
                            peerId: unpackedEvent[0].peer,
                            position: unpackedEvent[0].pos
                        });
                        break;
                    }
                    case 'addpeer': {
                        this.getConnect(unpackedEvent[0].data);
                        break;
                    }
                    default: {
                        console.log(this.eventHandler);
                        this.eventHandler(unpackedEvent);
                    }
                }
            });
			
            connection.on('error', () => {
                alert(connection.peer + ' : ERROR.');
				this.removeConnection(connection);
            });

            connection.on('close', (err) => {
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