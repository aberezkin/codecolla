import {connect} from 'react-redux';
import App from './App'

const mapStateToProps = (state) => {
    return {
        isSeed: state.isSeed
    }
};

export default connect(mapStateToProps)(App)
