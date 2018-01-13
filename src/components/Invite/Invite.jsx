import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Clippy from 'react-icons/lib/go/clippy';
import Modal from 'react-modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Button from '../Button';
import './Invite.styl';

const generateConnectionLink = (id) => {
    const url = window.location;
    return `${url.protocol}//${url.host}/connect/${id}`;
};

const mapStateToModalProps = state => ({
    isOpen: state.preferences.isInviteModalOpen,
});

const InviteModal = connect(mapStateToModalProps)(Modal);

const Invite = ({ peerId, toggle }) => (
    <InviteModal
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
        onRequestClose={() => toggle()}
        ariaHideApp={false}
    >
        <h1>Send it to your collegue</h1>
        <input
            type="text"
            className="link"
            value={generateConnectionLink(peerId)}
            disabled
        />
        <CopyToClipboard text={generateConnectionLink(peerId)}>
            <Button className="copy-button" right>
                <Clippy />
            </Button>
        </CopyToClipboard>
    </InviteModal>
);

Invite.propTypes = {
    peerId: PropTypes.string.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default Invite;
