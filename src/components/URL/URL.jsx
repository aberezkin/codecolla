import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Clippy from 'react-icons/lib/go/clippy';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../Button';
import './URL.styl';
import { createConnectedModal } from '../../higher-order-components/redux-connected-modal'
import { TOGGLE_URL_MODAL } from '../../actions';

import { createSimpleAction, openUrl } from '../../actions';
const mapDispatchToProps = dispatch => ({
    toggle: () => dispatch(createSimpleAction(TOGGLE_URL_MODAL)),
    openUrl: (url) => dispatch(openUrl(url)),
});

/*
const mapStateToModalProps = state => ({
    isOpen: state.preferences.isURLModalOpen,
});*/

//const URLModal = connect(mapStateToModalProps)(Modal);
const URLModal = createConnectedModal('isURLModalOpen', TOGGLE_URL_MODAL);

class URL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.loadContent = this.loadContent.bind(this);
        this.httpGet = this.httpGet.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    httpGet(url) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        } else {
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
    
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                this.props.openUrl(xmlhttp.responseText);
                this.setState({ inputValue: '' });
                this.props.toggle();
                return;
            }
        }
        xmlhttp.open("GET", url, false);
        xmlhttp.send();    
    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    loadContent() {
        this.httpGet(this.state.inputValue);
    }

    onKeyDown(event) {
        if (event.keyCode === 13) this.loadContent();
    }

    render() {
        if (this.input) this.input.focus();
        return (
            <URLModal
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
                onAfterOpen={() => { this.input.focus() }}
                ariaHideApp={false}
            >
                <h1>Enter URL</h1>
                <input
                    ref={(el) => {this.input = el}}
                    type="text"
                    className="link"
                    value={this.state.inputValue} 
                    onChange={this.updateInputValue}
                    onKeyDown={(event) => {this.onKeyDown(event);}}
                />
                <Button 
                    className="open-button" 
                    right
                    onClick={this.loadContent}
                >
                    Load
                </Button>
            </URLModal>
        );
    }
}

URL.propTypes = {
    openUrl: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(URL);
//export default URL;
