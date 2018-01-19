import { connect } from 'react-redux';
import Menu from './Menu';
import { createSimpleAction } from '../../actions/index';

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    onMenuOptionHandler: command => dispatch(createSimpleAction(command)),
});

export default connect(null, mapDispatchToProps)(Menu);
