import {SET_IS_SEED} from "../actions"

export default (state = false, action) => action.type === SET_IS_SEED ? action.payload : state

