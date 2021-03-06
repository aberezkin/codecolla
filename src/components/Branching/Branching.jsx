import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RouteConnector from '../RouteConnector';
import HotKeysWrapper from '../HotKeysWrapper';

const text =
    'console.log(\'Hello, World!\')';

// TODO: This component was reacted just to avoid merge conflicts with current PRs.
// TODO: Specifically https://github.com/aberezkin/codecolla/pull/42
// TODO: Move all this logic to App component and logic from App component somewhere else.
export default class Branching extends Component {
    componentDidMount() {
        this.props.setText(text);
        this.props.initPeer();
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
                        <Route exact path="/" component={HotKeysWrapper} />
                        <Route path="/connect/:id" component={RouteConnector} />
                    </AnimatedSwitch>
                </Router>
            </div>
        );
    }
}

Branching.propTypes = {
    initPeer: PropTypes.func.isRequired,
    setText: PropTypes.func.isRequired,
};
