import React, { Component } from 'react'
import './StatusBar.styl';
import LineSeparatorSelector from './LineSeparatorSelector/LineSeparatorSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ColorSchemeSelector from './ColorSchemeSelector/ColorSchemeSelector';

class StatusBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="StatusBar" style={{width: this.props.width,
                                               height: this.props.height}}>
                <div className="Left">
                </div>
                <div className="Right">
                    <LineSeparatorSelector />
                    <EncodingSelector />
                    <LanguageSelector />
                    <ColorSchemeSelector />
                </div>
            </div>
        )
    }
}

StatusBar.defaultProps = {
    width: '100%',
    height: '20px',
};

export default StatusBar;