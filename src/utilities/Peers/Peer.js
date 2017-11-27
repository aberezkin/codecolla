import './peerjs.js';

import ChangeEvent from './ChangeEvent';

let remotePeerIds = [];
let connections = [];

export const ADD_CURSOR = "ADD_CURSOR";
export const DELETE_CURSOR = "DELETE_CURSOR";
export const MOVE_CURSOR = "MOVE_CURSOR";

class PeerControl {
    constructor() {
        this.ID = '';
        this.peer = new Peer({key: 'e0twf5gs81lzbyb9', debug: true});
        
        this.handleConnection = this.handleConnection.bind(this);
        this.getConnect = this.getConnect.bind(this);
        this.broadcastMessage = this.broadcastMessage.bind(this);
        
        this.peer.on('open', (id) => {
            this.ID = id;
            console.log('pid', id);
        });  
          
        this.peer.on('connection', (conn) => {
            this.handleConnection(conn);
        });
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

    handleConnection(conn) {
        remotePeerIds.push(conn.peer);
        conn.on('open', () => {
            console.log("Connected with peer: ",this.getCheckboxStatus);
            //if (window.checkbox) {
            console.log('CHECKBOX status',this.getCheckboxStatus());
            if (this.getCheckboxStatus.call()) {
                let evnt = new ChangeEvent(conn.peer);
                let strEvnt = evnt.packEventNewPeer();
                this.broadcastMessage(strEvnt);
            }
			
            conn.on('data', (data) => {
                event = new ChangeEvent(data);
                var e = event.unpackEventArray();
                if (e[0].action == 'chat') {
                    console.log(conn.peer + ": " + e.text);
                } else if (e[0].action == 'move') {
                    this.cursorEventHandler({
						type: MOVE_CURSOR, 
						peerId: e[0].peer, 
						position: e[0].pos
                        });
                    console.log(e[0].pos);
                } else if (e[0].action == 'addpeer') {
                    this.getConnect(e[0].data);
                } else {
					console.log(this.eventHandler);
                    this.eventHandler(e);
                }
            });
			
            conn.on('error', () => {
                alert(conn.peer + ' : ERROR.');
				this.cursorEventHandler({
					type: DELETE_CURSOR, 
					peerId: conn.peer
                    });
                for (let i = 0; i < connections.length; ++i) {
                    if (connections[i].peer == conn.peer) {
                        connections.splice(i, 1);
                        break;
                    }
                }
            });

            conn.on('close', (err) => { 
                alert(conn.peer + ' has left the chat.');
                this.cursorEventHandler({
					type: DELETE_CURSOR, 
					peerId: conn.peer
                    });
                for (let i = 0; i < connections.length; ++i) {
                    if (connections[i].peer == conn.peer) {
                        connections.splice(i, 1);
                        break;
                    }
                }
            });
            
            connections.push(conn);
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

    broadcastMessage(msg) {
		connections.forEach(conn => conn.send(msg));
    }
    
    
}

export default PeerControl;