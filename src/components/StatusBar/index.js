import { connect } from 'react-redux';
import { setEncoding, setLanguage, setLinefeed, setTheme } from '../../actions/index';
import StatusBar from './StatusBar';

const mapStateToProps = state => ({
    theme: state.editorPreferences.theme,
    language: state.editorPreferences.language,
    linefeed: state.editorPreferences.linefeed,
    encoding: state.editorPreferences.encoding,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    setTheme: theme => dispatch(setTheme(theme)),
    setLanguage: language => dispatch(setLanguage(language)),
    setLinefeed: linefeed => dispatch(setLinefeed(linefeed)),
    setEncoding: encoding => dispatch(setEncoding(encoding)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
