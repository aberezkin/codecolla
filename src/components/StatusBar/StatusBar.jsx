import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StatusBar.styl';
import LinefeedSelector from './LinefeedSelector/LinefeedSelector';
import LanguageSelector from './LanguageSelector/LanguageSelector';
import EncodingSelector from './EncodingSelector/EncodingSelector';
import ThemeSelector from './ThemeSelector/ThemeSelector';

import Connector from '../Connector';

export const STATUS_BAR_CLASSNAME = 'StatusBar';

class StatusBar extends Component {
    static styleId() {
        return 'StatusBarStyle';
    }

    constructor(props) {
        super(props);
        this.changeTheme = this.changeTheme.bind(this);

        const styleDiv = document.createElement('div');
        styleDiv.setAttribute('id', StatusBar.styleId());
        document.body.insertBefore(styleDiv, document.body.firstChild);
        styleDiv.setAttribute('class', props.theme);
    }

    changeTheme(value) {
        this.props.setTheme(value);

        const styleName = value.replace(/_/g, '-');

        const styleDiv = document.getElementById(StatusBar.styleId());
        styleDiv.setAttribute('class', `ace-${styleName}`);

        this.setState({
            textColor: styleDiv.color,
            backgroundColor: styleDiv.backgroundColor,
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

StatusBar.propTypes = {
    linefeed: PropTypes.string.isRequired,
    encoding: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    setLinefeed: PropTypes.func.isRequired,
    setEncoding: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
    setTheme: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.string),
};

StatusBar.defaultProps = {
    isVisible: true,
    style: {
        width: '100%',
        height: '20px',
    },
};

export default StatusBar;
