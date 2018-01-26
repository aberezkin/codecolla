import {  TOGGLE_COPY, TOGGLE_PASTE, TOGGLE_CUT } from '../actions/index';

const copypasteMiddleware = store => next => action => {
    switch (action.type) {
        case TOGGLE_COPY:{
            //copy();
            //copy_clip('mytext')
            //copyText();
            document.execCommand("Copy", true); 
            next(action);
            break;
        }
        case TOGGLE_CUT: {
            document.execCommand("cut"); 
            next(action);
            break;
        }
        default: next(action);
    }
};

export default copypasteMiddleware;
