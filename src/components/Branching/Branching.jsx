import React, {Component} from 'react';
import { AnimatedSwitch } from 'react-router-transition';
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
            <div>
                <Router>
                    <AnimatedSwitch
                        atEnter={{ opacity: 0 }}
                        atLeave={{ opacity: 0 }}
                        atActive={{ opacity: 1 }}
                        className="switch-wrapper"
                    >
                        <Route exact path="/" component={App} />
                        <Route path="/connect/:id" component={RouteConnector}/>
                    </AnimatedSwitch>
                </Router>
            </div>
        )
    }
}
