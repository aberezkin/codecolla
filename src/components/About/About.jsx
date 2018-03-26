import React, { Component } from 'react';
import { createConnectedModal } from '../../higher-order-components/redux-connected-modal';
import { TOGGLE_ABOUT_MODAL } from '../../actions/index.js';
import Octocat from 'react-icons/lib/go/octoface';

const AboutModal = createConnectedModal('isAboutModalOpen', TOGGLE_ABOUT_MODAL);

const About = () => (
    <AboutModal
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
        <h1>Codecolla</h1>
        <h1><a href="https://github.com/aberezkin/codecolla" target="_blank"><Octocat /></a></h1>
        <h3>
            An open source online editor for 
            real time collaboration on your projects.
        </h3>
    </AboutModal>
)

export default About;
