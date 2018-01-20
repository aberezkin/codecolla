import {
    getGist,
    setText,
    broadcastActions,
    GET_GIST,
    GET_FULFIL,
    GET_REJECT,
    RESOURCE_GIST,
} from '../actions';

export default store => next => (action) => {
    switch (action.type) {
        case GET_GIST: {
            const getGistAction = getGist('a20b151a7162f283b716d32995f3cad7');
            store.dispatch(getGistAction);
            break;
        }
        case GET_FULFIL: {
            if (action.resource.name === RESOURCE_GIST) {
                const fileNames = Object.keys(action.value.files);
                if (fileNames.length === 1) {
                    const setTextAction = setText(action.value.files[fileNames[0]].content);
                    store.dispatch([broadcastActions([setTextAction]), setTextAction]);
                }
            }
            next(action);
            break;
        }
        case GET_REJECT: {
            if (action.resource.name === RESOURCE_GIST)
                console.log('PULL_ERROR');

            next(action);
            break;
        }
        default: next(action);
    }
};
