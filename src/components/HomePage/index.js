import { connect } from 'react-redux';
import HomePage from './HomePage';
import { enterSession } from '../../actions';

const mapStateToProps = state => ({
    nickname: state.preferences.nickname,
});

const mapDispatchToProps = dispatch => ({
    enterSession: command => dispatch(enterSession(command)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
