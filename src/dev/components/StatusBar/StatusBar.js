import React, { Component } from 'react'
import './StatusBar.styl';
import LineSeparatorSelector from './LineSeparatorSelector/LineSeparatorSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ColorSchemeSelector from './ColorSchemeSelector/ColorSchemeSelector';

//onChange(event, key, value)

class StatusBar extends Component {
    constructor(props) {
        super(props);
    }
    static name() {
        return 'StatusBar';
    }
    render() {
        return (
            <div className={StatusBar.name()} style={this.props.style}>
                <div className="Left">
                </div>
                <div className="Right">
                    <LineSeparatorSelector
                        selectedOption={this.props.valueEnding}
                        onChange={this.props.onChangeEnding}
                    />
                    <EncodingSelector
                        selectedOption={this.props.valueEncoding}
                        onChange={this.props.onChangeEncoding}
                    />
                    <LanguageSelector
                        selectedOption={this.props.valueLanguage}
                        onChange={this.props.onChangeLanguage}
                    />
                    <ColorSchemeSelector
                        selectedOption={this.props.valueTheme}
                        onChange={this.props.onChangeTheme}
                    />
                </div>
            </div>
        )
    }
}

StatusBar.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
    valueEnding : 'LF',
    onChangeEnding : (event, key, value) => {
        console.log(key, value);
    },
    valueEncoding : 'UTF-8',
    onChangeEncoding : (event, key, value) => {
        console.log(key, value);
    },
    valueLanguage : 'text',
    onChangeLanguage : (event, key, value) => {
        console.log(key, value);
    },
    valueTheme : 'github',
    onChangeTheme : (event, key, value) => {
        console.log(key, value);
    },
};

export default StatusBar;