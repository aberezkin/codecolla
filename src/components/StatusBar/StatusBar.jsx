import React, { Component } from 'react'
import './StatusBar.styl';
import LinefeedSelector from './LinefeedSelector/LinefeedSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ThemeSelector from './ThemeSelector/ThemeSelector';

import Connector from '../Connector';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);

        let styleDiv = document.createElement('div');
        styleDiv.setAttribute('id', StatusBar.styleId());
        document.body.insertBefore(styleDiv, document.body.firstChild);
        styleDiv.setAttribute('class', props.theme.value);

        let style = getComputedStyle(styleDiv);

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

    changeTheme(value) {
        this.props.setTheme(value);

        let styleName = value.replace(/_/g, "-");

        let styleDiv = document.getElementById(StatusBar.styleId());
        styleDiv.setAttribute('class', `ace-${styleName}`);
        let style = getComputedStyle(styleDiv);

        this.setState({
            theme: styleName,
            textColor: style.color,
            backgroundColor: style.backgroundColor
        });
    }

    render() {
        return (
            <div className={`${StatusBar.name()} +  ace-${this.state.theme}`} style={this.props.style}>
                <div className="Left">
                    <Connector onConnect={this.props.onConnect}/>
                </div>
                <div className="Right">
                    <LinefeedSelector
                        selectedOption={this.props.ending.value}
                        onChange={this.props.setLinefeed}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <EncodingSelector
                        selectedOption={this.props.encoding.value}
                        onChange={this.props.setEncoding}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <LanguageSelector
                        selectedOption={this.props.language.value}
                        onChange={this.props.setLanguage}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <ThemeSelector
                        selectedOption={this.props.theme.value}
                        onChange={this.changeTheme}
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
    },
    encoding: {
        value: 'UTF-8',
    },
    language: {
        value: 'text',
    },
    theme: {
        value: 'github',
    },
};

export default StatusBar;