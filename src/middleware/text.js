import {INSERT_LINE, insertLine, SET_LINE, setLine} from "../actions/index";
import {EDIT_INSERT, EDIT_REMOVE} from "../utilities/Peers/Peer";
import {generateLineId} from "../utilities/Helpers";

function insertTextToAtom(atom, isFirstLineSlice, pos, pasteText) {
    let oldText = atom.get('text');
    let newText = isFirstLineSlice ?
        oldText.slice(0, pos) + pasteText + oldText.slice(pos) :
        pasteText + oldText;
    return atom.set('text', newText);
}

function generateInsertActions(atoms, event) {
    const isFirstLineSlice = event.startCol !== 0 || event.startRow === event.endRow;
    let actions = [];

    actions.push(setLine(event.startRow,
        insertTextToAtom(atoms.get(event.startRow), isFirstLineSlice, event.startCol, event.text[0])));

    for (let i = 0 + isFirstLineSlice; i < event.text.length + isFirstLineSlice - 1; ++i) {
        let atom = {
            id: generateLineId(),
            text: event.text[i],
            time: 1
        };
        actions.push(insertLine(event.startRow + i, atom))
    }

    return actions;
}

function generateRemoveActions(event) {
    // TODO: implement
}

const textMiddleware = store => next => action => {
    switch (action.type) {
        case EDIT_INSERT:
            next(generateInsertActions(store.getState().text, action.payload));
            break;
        case EDIT_REMOVE:
            next(generateRemoveActions(action.payload));
            break;
        default: next(action);
    }
};

export default textMiddleware;
