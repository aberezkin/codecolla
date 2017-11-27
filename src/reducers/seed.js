export default (state = false, action) => {
    if (state === 'CHECK_SEED') {
        return action.data;
    }
    return state;
};
