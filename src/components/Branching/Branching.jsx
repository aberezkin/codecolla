import React, {Component} from 'react';
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteConnector from "../RouteConnector";
import App from "../App";

const text =
    `function hello() {
    console.log('Hello, World!');
}`;

// TODO: This component was reacted just to avoid merge conflicts with current PRs.
// TODO: Specifically https://github.com/aberezkin/codecolla/pull/42
// TODO: Move all this logic to App component and logic from App component somewhere else.
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
