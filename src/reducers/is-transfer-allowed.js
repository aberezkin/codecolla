import {SET_IS_TRANSFER_ALLOWED} from "../actions/index";

export default (state = true, action) => action.type === SET_IS_TRANSFER_ALLOWED ? action.payload : state