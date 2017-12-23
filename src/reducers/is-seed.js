import { SET_IS_SEED } from '../actions';
import { generateSetterReducer } from '../utilities/Helpers';

export default generateSetterReducer(SET_IS_SEED, false);

