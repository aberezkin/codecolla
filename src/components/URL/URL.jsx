import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Clippy from 'react-icons/lib/go/clippy';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../Button';
import './URL.styl';

const mapStateToModalProps = state => ({
    isOpen: state.preferences.isURLModalOpen,
});

const URLModal = connect(mapStateToModalProps)(Modal);


class URL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        };
        this.updateInputValue = this.updateInputValue.bind(this);
        this.onPressBtn = this.onPressBtn.bind(this);
        this.httpGet = this.httpGet.bind(this);
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
    onPressBtn() {
        this.httpGet(this.state.inputValue);
    }
    render() {
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
                onRequestClose={() => this.props.toggle()}
                ariaHideApp={false}
            >
                <h1>Enter URL</h1>
                <input
                    type="text"
                    className="link"
                    value={this.state.inputValue} 
                    onChange={this.updateInputValue}
                />
                <Button className="copy-button" 
                    right
                    onClick={this.onPressBtn}>Load
                </Button>
            </URLModal>
        );
    }
}

URL.propTypes = {
    toggle: PropTypes.func.isRequired,
    openUrl: PropTypes.func.isRequired,
};

export default URL;
