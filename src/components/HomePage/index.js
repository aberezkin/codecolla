import { connect } from 'react-redux';
import HomePage from './HomePage';
import { enterSession } from '../../actions';

const mapDispatchToProps = dispatch => ({
    enterSession: nickname => dispatch(enterSession(nickname)),
});

export default connect(null, mapDispatchToProps)(HomePage);
