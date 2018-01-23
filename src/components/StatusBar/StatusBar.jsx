import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StatusBar.styl';
import languages from '../../utilities/HighlightLanguages';
import themes from '../../utilities/ColorSchemes';
import Connector from '../Connector';
import ListSelector from '../ListSelector/ListSelector';

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

        this.state = {
            textColor: styleDiv.color,
        };
    }

    changeTheme(value) {
        this.props.setTheme(value);

        const styleName = value.replace(/_/g, '-');

        const styleDiv = document.getElementById(StatusBar.styleId());
        styleDiv.setAttribute('class', `ace-${styleName}`);

        this.setState({
            textColor: styleDiv.color,
        });
    }

    render() {
        return (
            <div className={STATUS_BAR_CLASSNAME} style={this.props.style}>
                <div className="Left">
                    <Connector />
                </div>
                <div className="Right">
                    <ListSelector
                        options={['CRLF', 'LF', 'CR']}
                        active={this.props.linefeed}
                        onChange={this.props.setLinefeed}
                        textColor={this.state.textColor}
                    />
                    <ListSelector
                        options={['UTF-8', 'CP-866', 'CP-1255']}
                        active={this.props.encoding}
                        onChange={this.props.setEncoding}
                        textColor={this.state.textColor}
                    />
                    <ListSelector
                        options={languages}
                        active={this.props.language}
                        onChange={this.props.setLanguage}
                        textColor={this.state.textColor}
                    />
                    <ListSelector
                        options={themes}
                        active={this.props.theme}
                        onChange={this.changeTheme}
                        textColor={this.state.textColor}
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
    style: PropTypes.objectOf(PropTypes.string),
};

StatusBar.defaultProps = {
    style: {
        width: '100%',
        height: '20px',
    },
};

export default StatusBar;
