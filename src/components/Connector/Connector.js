import React, {Component} from 'react';
import PeerControl from '../Peers/Peer.js';
import ChangeEvent from '../Editor/ChangeEvent';
import './Connector.styl';

class Connector extends Component {
    constructor(props) {
        super(props);
        this.addPeed = '';
        this.msg = '';
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleChange(evt) {  
        this.addPeer = evt.target.value;
        console.log("addPeer "+this.addPeer);
    }

    handleChangeMsg(evt) {  
        this.msg = evt.target.value;
        console.log("msg "+this.msg);
    }

    handleCheckboxChange(evt) {
        //console.log(this.props.setCheckboxStatus, evt.target.checked);
        this.props.setCheckboxStatus(evt.target.checked);
    }

    static name() {
        return 'Connector';
    }
    render() {
        return(
            <div className={Connector.name()}>
               <input type="text" id="rid"
                    placeholder="Someone else's id"
                    onChange={this.handleChange}/>
               <button onClick={ () => {
						this.props.onConnect(this.addPeer);
                        //this.peer.getConnect(this.addPeer)
                    }}>
                    CONNECT
               </button>
               <input type="checkbox" id="cb" name="admin"
                    onChange={this.handleCheckboxChange} />
               {/*<input type="text" id="msg" */}
                    {/*placeholder="Text"*/}
                    {/*onChange={this.handleChangeMsg}/>*/}
               {/*<button onClick={ () => {*/}
                    {/*let event = new ChangeEvent(this.msg);*/}
                    {/*var eventStr = event.packEventChatMsg();*/}
                    {/*this.peer.broadcastMessage(eventStr);*/}
                   {/*} }>*/}
                   {/*SEND*/}
               {/*</button>*/}
            </div>
        );
    }
}

export default Connector;
