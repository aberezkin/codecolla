import { connect } from 'react-redux';
import Menu from './Menu';
import { createSimpleAction, addHotKey } from '../../actions/index';

const mapStateToProps = state => ({
    isStatusBarVisible : state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    hotKeysMap: state.preferences.hotkeys.map,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    onMenuOptionHandler: command => dispatch(createSimpleAction(command)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
