import React, { Component } from 'react';
import { createConnectedModal } from '../../higher-order-components/redux-connected-modal';
import { TOGGLE_PASTE } from '../../actions/index.js';

const PasteModal = createConnectedModal('isPaste', TOGGLE_PASTE);

const Paste = () => (
    <PasteModal
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
        <h1>Paste action</h1>
        <h3>
            Use Ctrl + V to paste the text.
        </h3>
    </PasteModal>
)

export default Paste;