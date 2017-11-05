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
                        var e = event.unpackEvent();
                        //console.log("e: " + e.text);
                        if (e.action == 'insert') {
                            //console.log('mouse', window.editor.getCursorPosition());
                            console.log('mouse', e.text[0]);
                            for (var i = 0; i < e.text.length; i++) {
                                var prnt = '';
                                if (e.text.length > 1 && i < e.text.length) {
                                    prnt = e.text[i] == '\r' ? '\n' : e.text[i] +'\n';
                                } else {
                                    prnt = e.text[i] == '\r' ? '\n' : e.text[i];
                                }
                                window.boolForOnChange = false;
                                window.editor.session.insert({row: e.startRow, 
                                    column: e.startCol}, prnt);
                            }
                        }
                        if (e.action == 'remove') {
                            var rng = {start: {row: e.startRow, column: e.startCol}, end: {row: e.endRow, column: e.endCol}};
                            console.log(rng);
                            window.editor.session.remove(rng);
                                            }
                        if (e.action == 'chat') {
                            console.log(conn.peer + ": " + e.text);
                        }
                        if (e.action == 'move') {
        
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
                var e = event.unpackEvent();
                //console.log("e: " + e.text);
                if (e.action == 'insert') {
                    //console.log('mouse', window.editor.getCursorPosition());
                    console.log('mouse', e.text[0]);
                    for (var i = 0; i < e.text.length; i++) {
                        var prnt = '';
                        if (e.text.length > 1 && i < e.text.length) {
                            prnt = e.text[i] == '\r' ? '\n' : e.text[i] +'\n';
                        } else {
                            prnt = e.text[i] == '\r' ? '\n' : e.text[i];
                        }
                        window.boolForOnChange = false;
                        window.editor.session.insert({row: e.startRow, 
                            column: e.startCol}, prnt);
                    }
                }
                if (e.action == 'remove') {
                    var rng = {start: {row: e.startRow, column: e.startCol}, end: {row: e.endRow, column: e.endCol}};
                    console.log(rng);
                    window.editor.session.remove(rng);
                                    }
                if (e.action == 'chat') {
                    console.log(conn.peer + ": " + e.text);
                }
                if (e.action == 'move') {

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
		
		console.log("send: "+msg);
    }
    
    
}

export default PeerControl;