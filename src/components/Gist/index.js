import { connect } from 'react-redux';
import Gist from './Gist';
import { getGist, handleMenuCommand, TOGGLE_GIST_MODAL } from '../../actions/index';
import PropTypes from "prop-types";

const mapDispatchToProps = dispatch => ({
    getGist: id => dispatch([getGist(id), handleMenuCommand(TOGGLE_GIST_MODAL)]),
});

export default connect(null, mapDispatchToProps)(Gist);
