import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getPageHeight} from "../../utilities/Helpers";
import Editor from '../Editor/Editor';
import StatusBar from '../StatusBar/StatusBar';
import PeerControl from '../../utilities/Peers/Peer.js';
import '../../utilities/BraceConfigs';
import './App.styl';

const defaultValue =
`function hello() {
    console.log('Hello, World!');
}`;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: defaultValue,
            theme: 'monokai',
            mode: 'javascript',
        };

        this.style = {
            wrapper : {
                width: '100%',
                height : getPageHeight() - 20 + 'px',
            },
        };

        this.onChangeMode = this.onChangeMode.bind(this);
        this.onChangeTheme = this.onChangeTheme.bind(this);
        this.onChange = this.onChange.bind(this);

		this.isTransferAllowed = true;
        this.isSeed = false;
        this.peerControl = new PeerControl();
    }
	
	componentDidMount() {
		this.peerControl.setEditEventHandler((e) => {
			this.editorRef.handleEvent(e);
		});
		this.peerControl.setCursorEventHandler((e) => {
			this.editorRef.handleCursorEvent(e);
        });
        this.peerControl.setCheckboxStatusHandler(() => {
            return this.props.isSeed;x
        })
	}

    static name() {
        return 'App';
    }

    static resize() {
        let wrapper = document.querySelectorAll(`.${App.name()} .wrapper`)[0];
        let statusBar = document.querySelectorAll(`.${App.name()} .${StatusBar.name()}`)[0];
        wrapper.style.height = `${getPageHeight() - statusBar.offsetHeight}px`;
    }

    onChangeMode(event, key, value) {
        this.setState({
            mode : value
        });
    }

    onChangeTheme(event, key, value) {
        this.setState({
            theme: value
        });
    }

    onChange(newValue) {
        this.setState({
            value: newValue
        });
    }
	
	onConnect() {
		return (id) => {this.peerControl.getConnect(id)}
	}
	
    render() {
        return (
            <div className={App.name()}>
                <div className={'wrapper'} style={this.style.wrapper}>
                    <Editor
						ref={(editor) => { this.editorRef = editor; }}
                        mode={this.state.mode}
                        theme={this.state.theme}
                        value={this.state.value}
                        peerControl={this.peerControl}
                        getIsPermissionToTransfer={() => {
                            return this.isTransferAllowed;
                        }}
                        setIsPermissionToTransfer={(e) => {
                            this.isTransferAllowed = e;
                        }}
                    />
                </div>
                <StatusBar
					onConnect={this.onConnect()}
                    style={this.style.statusBar}
                    theme={{
                        value: this.state.theme,
                        onChange: this.onChangeTheme,
                    }}
                    language={{
                        value: this.state.mode,
                        onChange: this.onChangeMode,
                    }}
                />
            </div>
        )
    }
}

window.addEventListener('resize', App.resize, true);

const mapStateToProps = (state) => {
    return {
        isSeed: state.isSeed
    }
};

export default connect(mapStateToProps)(App)
