import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteConnector from "../RouteConnector";
import App from "../App";

const text =
    `function hello() {
    console.log('Hello, World!');
}`;

export default class Branching extends Component {
    componentDidMount() {
        this.props.initPeer();
        this.props.setText(text);
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path="/connect/:id" component={RouteConnector}/>
                    <Route exact path="/" component={App} />
                </div>
            </Router>
        )
    }
}
