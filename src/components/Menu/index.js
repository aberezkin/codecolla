import { connect } from 'react-redux';
import Menu from './Menu';
import { createSimpleAction, onFileOpen, addHotKey } from '../../actions/index';
import PropTypes from "prop-types";


const mapStateToProps = state => ({
    isStatusBarVisible : state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    hotKeysMap: state.preferences.hotkeys.map,
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    onMenuOptionHandler: command => dispatch(createSimpleAction(command)),
    onFileOpen: files => dispatch(onFileOpen(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
