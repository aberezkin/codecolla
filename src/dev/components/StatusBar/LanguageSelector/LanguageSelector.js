import React, { Component } from 'react';
import './StatusBar.styl';

class LanguageSelector extends Component {
    name = 'LanguageSelector';
    isOpen = false;
    viewElements(e) {
        e.preventDefault();
        let button = document.getElementsByClassName(this.name)[0];
        this.isOpen != this.isOpen;
        if (this.isOpen) {}
    }
    render() {
        return (
            <div className={this.name}></div>,
            <div className="List of elements"></div>
        )
    }
}

export default LanguageSelector;