import { SET_IS_TRANSFER_ALLOWED } from '../actions/index';
import { generateSetterReducer } from '../utilities/Helpers';

export default generateSetterReducer(SET_IS_TRANSFER_ALLOWED, true);
