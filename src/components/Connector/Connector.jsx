import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Connector.styl';

class Connector extends Component {
    static name() {
        return 'Connector';
    }

    constructor(props) {
        super(props);

        this.addPeer = '';
        this.msg = '';

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.addPeer = evt.target.value;
    }

    render() {
        return (
            <div className={Connector.name()}>
                <input
                    type="text"
                    id="rid"
                    placeholder="Someone else's id"
                    onChange={this.handleChange}
                />
                <button onClick={() => this.props.connectToPeer(this.addPeer)}>
                    Connect
                </button>
            </div>
        );
    }
}


Connector.propTypes = {
    connectToPeer: PropTypes.func.isRequired,
};

export default Connector;
