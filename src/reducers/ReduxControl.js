import {combineReducers} from 'redux'

const isSeed = function(state = false, action) {
    if (state === 'CHECKBOX') {
        return action.data;
    }
    return state;
};

const reducers = combineReducers({
    isSeed,
});

export default reducers;