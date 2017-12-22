import React, { Component } from 'react';
import './StatusBar.styl';
import LinefeedSelector from './LinefeedSelector/LinefeedSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ThemeSelector from './ThemeSelector/ThemeSelector';

import Connector from '../Connector';

export const STATUS_BAR_CLASSNAME = 'StatusBar';

class StatusBar extends Component {
    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);

        const styleDiv = document.createElement('div');
        styleDiv.setAttribute('id', StatusBar.styleId());
        document.body.insertBefore(styleDiv, document.body.firstChild);
        styleDiv.setAttribute('class', props.theme);

        const style = getComputedStyle(styleDiv);

        this.state = {
            theme: props.theme,
            textColor: style.color,
            backgroundColor: style.backgroundColor,
        };
    }

    static styleId() {
        return 'StatusBarStyle';
    }

    changeTheme(value) {
        this.props.setTheme(value);

        const styleName = value.replace(/_/g, '-');

        const styleDiv = document.getElementById(StatusBar.styleId());
        styleDiv.setAttribute('class', `ace-${styleName}`);
        const style = getComputedStyle(styleDiv);

        this.setState({
            theme: styleName,
            textColor: style.color,
            backgroundColor: style.backgroundColor,
        });
    }

    render() {
        return (
            <div
                className={`${STATUS_BAR_CLASSNAME}`}
                style={{ display: (!this.props.isVisible) ? 'none' : '', ...this.props.style }}
            >
                <div className="Left">
                    <Connector />
                </div>
                <div className="Right">
                    <LinefeedSelector
                        selectedOption={this.props.linefeed}
                        onChange={this.props.setLinefeed}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <EncodingSelector
                        selectedOption={this.props.encoding}
                        onChange={this.props.setEncoding}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <LanguageSelector
                        selectedOption={this.props.language}
                        onChange={this.props.setLanguage}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                    <ThemeSelector
                        selectedOption={this.props.theme}
                        onChange={this.changeTheme}
                        textColor={this.state.textColor}
                        backgroundColor={this.state.backgroundColor}
                    />
                </div>
            </div>
        );
    }
}

StatusBar.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default StatusBar;
