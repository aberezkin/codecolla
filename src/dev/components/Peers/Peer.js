import AceEditor from 'react-ace';
import './peerjs.js';

import ChangeEvent from '../Editor/ChangeEvent';

var remotePeerIds = [];

var connections = [];

class PeerControl {

    constructor() {

        this.peer = new Peer({key: 'e0twf5gs81lzbyb9', debug: true});
        
        this.handleConnection = this.handleConnection.bind(this);
        this.getConnect = this.getConnect.bind(this);
        this.broadcastMessage = this.broadcastMessage.bind(this);
        
        this.peer.on('open', function(id) {
            console.log('pid', id);
        });  
          
        this.peer.on('connection', function(conn) {
            remotePeerIds.push(conn.peer);
            
                conn.on('open', function() {
                    console.log("Connected with peer: ");
                    conn.on('data', function(data) {
                        event = new ChangeEvent(data);
                        var e = event.unpackEventArray();
                        if (e[0].action == 'chat') {
                            console.log(conn.peer + ": " + e.text);
                        }
                        if (e[0].action == 'move') {
        
                        } else {
                            window.crdt.insertEvent(e);
                        }
                    });
                    conn.on('error',function(){
                        alert(conn.peer + ' : ERROR.') 
                    });
        
                    conn.on('close', function(err){ 
                        alert(conn.peer + ' has left the chat.') 
                    });
                    
                    connections.push(conn);
                });
        });
    }

    handleConnection(conn) {
        remotePeerIds.push(conn.peer);
    
        conn.on('open', function() {
            console.log("Connected with peer: ");
            conn.on('data', function(data) {
                event = new ChangeEvent(data);
                var e = event.unpackEventArray();
                if (e[0].action == 'chat') {
                    console.log(conn.peer + ": " + e.text);
                }
                if (e[0].action == 'move') {

                } else {
                    window.crdt.insertEvent(e);
                }
            });
            conn.on('error',function(){
                alert(conn.peer + ' : ERROR.') 
            });

            conn.on('close', function(err){ 
                alert(conn.peer + ' has left the chat.') 
            });
            
            connections.push(conn);
        });
    }

    getConnect(id) {
        var conn = this.peer.connect(id);
        this.handleConnection(conn);
    }

    broadcastMessage(msg) {
		for(var i=0;i<connections.length;i++){
			connections[i].send(msg);
		}
		
		//console.log("send: "+msg);
    }
    
    
}

export default PeerControl;