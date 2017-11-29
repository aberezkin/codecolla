import React, {Component} from 'react';
import './Connector.styl';
import {connect} from 'react-redux';
import {setIsSeed} from "../../actions/index";

class Connector extends Component {
    constructor(props) {
        super(props);

        this.addPeer = '';
        this.msg = '';

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    handleChange(evt) {  
        this.addPeer = evt.target.value;
    }

    handleChangeMsg(evt) {  
        this.msg = evt.target.value;
    }

    handleCheckboxChange(evt) {
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
               <button onClick={() => {
						this.props.onConnect(this.addPeer);
                    }}>
                    CONNECT
               </button>
               <input type="checkbox" id="cb" name="admin"
                    onChange={this.props.seedChange} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        seedChange: (e) => dispatch(setIsSeed(e.target.checked))
    }
};

export default connect(null, mapDispatchToProps)(Connector);
// export default Connector;
