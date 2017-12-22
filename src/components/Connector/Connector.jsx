import React, { Component } from 'react';
import './Connector.styl';

export default class Connector extends Component {
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
                <input
                    type="checkbox"
                    id="cb"
                    name="admin"
                    onChange={this.props.seedChange}
                />
            </div>
        );
    }
}
