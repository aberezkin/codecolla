import React, { Component } from 'react'
import './StatusBar.styl';
import LineSeparatorSelector from './LineSeparatorSelector/LineSeparatorSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ColorSchemeSelector from './ColorSchemeSelector/ColorSchemeSelector';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.onThemeHandler = this.onThemeHandler.bind(this);

        let styleDiv = document.createElement('div');
        styleDiv.setAttribute('id', StatusBar.styleId());
        document.body.insertBefore(styleDiv, document.body.firstChild);
        styleDiv.setAttribute('class', props.theme.value);

        let style = getComputedStyle(styleDiv);
        console.log(style);

        this.state = {
            theme : props.theme.value,
            textColor: style.color,
            backgroundColor: style.backgroundColor
        };

    }
    static name() {
        return 'StatusBar';
    }
    static styleId() {
        return 'StatusBarStyle';
    }
    onThemeHandler(event, key, value) {
        this.props.theme.onChange(event, key, value);

        value = value.replace(/_/g, "-");

        let styleDiv = document.getElementById(StatusBar.styleId());
        styleDiv.setAttribute('class', 'ace-'+value);

        console.log('status bar theme: .ace-' + value);
        this.setState({
            theme : value
        });
        let style = getComputedStyle(styleDiv);
        console.log(style);
        this.setState({
            textColor: style.color,
            backgroundColor: style.backgroundColor
        });
    }
    render() {
        return (
            <div className={StatusBar.name() + ' ace-'+this.state.theme} style={this.props.style}>
                <div className="Left">
                </div>
                <div className="Right">
                    <LineSeparatorSelector
                        selectedOption={this.props.ending.value}
                        onChange={this.props.ending.onChange}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <EncodingSelector
                        selectedOption={this.props.encoding.value}
                        onChange={this.props.encoding.onChange}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <LanguageSelector
                        selectedOption={this.props.language.value}
                        onChange={this.props.language.onChange}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <ColorSchemeSelector
                        selectedOption={this.props.theme.value}
                        onChange={this.onThemeHandler}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
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
    ending: {
        value: 'LF',
        onChange: (event, key, value) => {
            console.log(key, value);
        }
    },
    encoding: {
        value: 'UTF-8',
        onChange: (event, key, value) => {
            console.log(key, value);
        }
    },
    language: {
        value: 'text',
        onChange: (event, key, value) => {
            console.log(key, value);
        }
    },
    theme: {
        value: 'github',
        onChange: (event, key, value) => {
            console.log(key, value);
        }
    },
};

export default StatusBar;