import {connect} from 'react-redux';
import MenuBar from './MenuBar';

const mapStateToProps = state => {
    return {
        theme: state.editorPreferences.theme,
    }
};

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
