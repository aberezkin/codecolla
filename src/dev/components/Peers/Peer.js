import AceEditor from 'react-ace';
import './peerjs.js';

import ChangeEvent from '../Editor/ChangeEvent';
import CursorManager from './CursorManager';

var remotePeerIds = [];

var connections = [];

class PeerControl {

    constructor() {
        this.ID = '';
        this.peer = new Peer({key: 'e0twf5gs81lzbyb9', debug: true});
        
        this.handleConnection = this.handleConnection.bind(this);
        this.getConnect = this.getConnect.bind(this);
        this.broadcastMessage = this.broadcastMessage.bind(this);
        
        this.peer.on('open', function(id) {
            window.peer.ID = id;
            console.log('pid', id);
        });  
          
        this.peer.on('connection', function(conn) {
            remotePeerIds.push(conn.peer);
            
                conn.on('open', function() {
                    console.log("Connected with peer: "+conn.peer);
                    if (window.checkbox) {
                        let evnt = new ChangeEvent(conn.peer);
                        let strEvnt = evnt.packEventNewPeer();
                        window.peer.broadcastMessage(strEvnt);
                    }
                    conn.on('data', function(data) {
                        event = new ChangeEvent(data);
                        var e = event.unpackEventArray();
                        if (e[0].action == 'chat') {
                            console.log(conn.peer + ": " + e.text);
                        } else if (e[0].action == 'move') {
                            window.cursors.move(e[0].peer, e[0].pos);
                        } else if (e[0].action == 'addpeer') {
                            this.getConnect(e[0].data);
                        } else {
                            window.crdt.insertEvent(e);
                        }
                    });
                    conn.on('error',function(){
                        alert(conn.peer + ' : ERROR.');
                        window.cursors.del(conn.peer); 
                    });
        
                    conn.on('close', function(err){ 
                        alert(conn.peer + ' has left the chat.');
                        window.cursors.del(conn.peer);
                    });
                    
                    connections.push(conn);
                });
        });
    }

    handleConnection(conn) {
        remotePeerIds.push(conn.peer);
        conn.on('open', function() {
            console.log("_Connected with peer: ");
            conn.on('data', function(data) {
                event = new ChangeEvent(data);
                var e = event.unpackEventArray();
                if (e[0].action == 'chat') {
                    console.log(conn.peer + ": " + e.text);
                } else if (e[0].action == 'move') {
                    window.cursors.move(e[0].peer, e[0].pos);
                } else if (e[0].action == 'addpeer') {
                    window.peer.getConnect(e[0].data);
                } else {
                    window.crdt.insertEvent(e);
                }
            });
            conn.on('error',function(){
                alert(conn.peer + ' : ERROR.');
                window.cursors.del(conn.peer); 
            });

            conn.on('close', function(err){ 
                alert(conn.peer + ' has left the chat.');
                window.cursors.del(conn.peer);
            });
            
            connections.push(conn);
        });
    }

    getConnect(id) {
        var conn = this.peer.connect(id);
        this.handleConnection(conn);

        window.cursors.add(id, {row: 0, column: 0});
    }

    broadcastMessage(msg) {
		for(var i=0;i<connections.length;i++){
			connections[i].send(msg);
		}
		
		//console.log("send: "+msg);
    }
    
    
}

export default PeerControl;