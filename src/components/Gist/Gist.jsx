import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { TOGGLE_GIST_MODAL } from '../../actions/index';
import { createConnectedModal } from '../../higher-order-components/redux-connected-modal'
import './Gist.styl';

const GistModal = createConnectedModal('isGistModalOpen', TOGGLE_GIST_MODAL);

class Gist extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    onClick(obj){
        const innerLink = this.refs.gistLink.value;
        const linkPattern = /https:\/\/gist.github.com\/[a-zA-Z][0-9a-zA-Z]*\/[0-9a-f]{10,}/;
        const idPattern = /[0-9a-f]{32}$/;
        if (innerLink.search(linkPattern) === 0){
            const res = innerLink.match(idPattern)[0];
            this.props.getGist(res);
            this.refs.error.textContent = "";
            this.refs.gistLink.value = "";
        }
        else{
            console.log(this.refs)
            this.refs.error.textContent = "wrong link!";
        }
    }

    render() {
        return (
            <GistModal
                className={{
                    base: 'modal',
                    afterOpen: 'modal-open',
                    beforeClose: 'modal-close',
                }}
                overlayClassName={{
                    base: 'dropdown',
                    afterOpen: 'dropdown-open',
                    beforeClose: 'dropdown-close',
                }}
                ariaHideApp={false}
            >
                <h1>Write gist link!</h1>
                <input
                    id="gistLink"
                    ref="gistLink"
                    type="text"
                    className="link"
                /><br />
                <p className="error-mes" ref="error" color="red" /><br />
                <button
                    onClick={event => (this.onClick(event))}
                >
                    Get gist!
                </button>
            </GistModal>
        );
    }
};

Gist.propTypes = {
    getGist: PropTypes.func.isRequired,
};

Gist.defaultProps = {};

export default Gist;
