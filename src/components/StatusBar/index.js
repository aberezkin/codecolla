import {connect} from 'react-redux';
import {setEncoding, setLanguage, setLinefeed, setTheme} from "../../actions/index";
import StatusBar from "./StatusBar";

const mapDispatchToProps = dispatch => {
    return {
        setTheme: theme => dispatch(setTheme(theme)),
        setLanguage: language => dispatch(setLanguage(language)),
        setLinefeed: linefeed => dispatch(setLinefeed(linefeed)),
        setEncoding: encoding => dispatch(setEncoding(encoding))
    }
};

export default connect(null, mapDispatchToProps)(StatusBar);
