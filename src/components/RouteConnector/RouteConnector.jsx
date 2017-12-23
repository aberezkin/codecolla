import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RouteConnector.styl';

class RouteConnector extends Component {
    componentWillReceiveProps(newProps) {
        const { history } = this.props;

        if (!this.props.isReady && newProps.isReady) {
            this.props.connect(this.props.id);
            history.replace('/');
        }
    }

    render() {
        const { id } = this.props;

        return (
            <div className="route-connector">
                <h1>Connecting to peer: {id}</h1>
                <h1>spinner...</h1>
            </div>
        );
    }
}

RouteConnector.propTypes = {
    id: PropTypes.string.isRequired,
    isReady: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-typos
    history: PropTypes.objectOf(PropTypes.func).isRequired,
    connect: PropTypes.func.isRequired,
};

export default RouteConnector;
