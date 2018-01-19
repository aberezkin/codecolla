import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './HomePage.styl';

export const HOME_PAGE = 'HomePage';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: '' };
    }

    onSelect() {
        this.isNickNameValid = this.state.nickname === '' || this.state.nickname.match(/^[^0-9]\w+$/) !== null;
        document.querySelector(`.${HOME_PAGE} .wrapper input`).style.boxShadow = !this.isNickNameValid ? '0 0 10px red' : '0 0 10px #3b53ff';
    }

    onBlur() {
        document.querySelector(`.${HOME_PAGE} .wrapper input`).style.boxShadow = !this.isNickNameValid ? '0 0 10px red' : 'none';
    }

    enterSession() {
        if (this.state.nickname.length && this.isNickNameValid)
            this.props.enterSession(this.state.nickname);
    }

    render() {
        return (
            <div className={HOME_PAGE} style={this.props.style}>
                <div className="wrapper">
                    <div id="Logo">CodeColla</div>
                    <input
                        type="text"
                        value={this.state.nickname}
                        placeholder="Nickname..."
                        onChange={event => this.setState({ nickname: event.target.value })}
                        onSelect={() => this.onSelect()}
                        onBlur={() => this.onBlur()}
                    />
                    <button
                        id="CreateNewSession"
                        onClick={(event) => { this.enterSession(event); }}
                    >
                        Create new session
                    </button>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    enterSession: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.string),
};

HomePage.defaultProps = {
    style: {},
};

export default HomePage;
