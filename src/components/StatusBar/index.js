import { connect } from 'react-redux';
import { setEncoding, setLanguage, setLinefeed, setTheme } from '../../actions/index';
import StatusBar from './StatusBar';

const mapStateToProps = state => ({
    theme: state.preferences.theme,
    language: state.preferences.editor.language,
    linefeed: state.preferences.editor.linefeed,
    encoding: state.preferences.editor.encoding,
    cursorPosition: state.cursorPosition,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setLanguage: language => dispatch(setLanguage(language)),
    setLinefeed: linefeed => dispatch(setLinefeed(linefeed)),
    setEncoding: encoding => dispatch(setEncoding(encoding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
