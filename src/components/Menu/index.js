import { connect } from 'react-redux';
import Menu from './Menu';
import { createSimpleAction, onFileOpen, addHotKey } from '../../actions/index';
import PropTypes from "prop-types";


const mapStateToProps = state => ({
    isStatusBarVisible : state.preferences.isStatusBarVisible,
    isChatVisible: state.preferences.isChatVisible,
    isFullscreen: state.preferences.isFullscreen,
    hotKeysMap: state.preferences.hotkeys.map,
    hotKeysHandlers: state.preferences.hotkeys.handlers,
    language: state.preferences.editor.language,
    compileLanguages: new Map([
        ['python', 0],
        ['ruby', 1],
        ['clojure', 2],
        ['php', 3],
        ['javascript', 4],
        ['scala', 5],
        ['go', 6],
        ['c_cpp', 7],
        ['java', 8],
        ['VB.NET', 9],
        ['csharp', 10],
        ['sh', 11],
        ['Objective-C', 12],
        ['mysql', 13],
        ['perl', 14],
        ['rust', 15],
    ]),
});

// TODO: move this to individual selectors
const mapDispatchToProps = dispatch => ({
    onMenuOptionHandler: command => dispatch(createSimpleAction(command)),
    onFileOpen: files => dispatch(onFileOpen(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
