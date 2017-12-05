import React, {Component} from 'react';
import './Connector.styl';

export default class Connector extends Component {
    constructor(props) {
        super(props);

        this.addPeer = '';
        this.msg = '';

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {  
        this.addPeer = evt.target.value;
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
               <button onClick={() => this.props.connectToPeer(this.addPeer)}>
                    Connect
               </button>
               <input type="checkbox" id="cb" name="admin"
                    onChange={this.props.seedChange} />
            </div>
        );
    }
}
