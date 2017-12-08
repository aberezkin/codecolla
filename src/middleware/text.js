import {broadcastActions, INSERT_EVENT, insertLine, REMOVE_EVENT, removeLine, setLine} from "../actions/index";
import {generateLineId} from "../utilities/Helpers";

function getNewTimeForAtom(atom) {
    let oldTime = atom.get('time');
    return atom.set('time', ++oldTime);
}

function insertTextToAtom(atom, pos, pasteText) {
    let oldText = atom.get('text');
    atom = getNewTimeForAtom(atom);
    return atom.set('text', oldText.slice(0, pos) + pasteText + oldText.slice(pos));
}

function removeTextFromAtom(atom, from = 0, to = Number.MAX_VALUE) {
    let oldText = atom.get('text');
    atom = getNewTimeForAtom(atom);
    return atom.set('text', newText);
}

function generateInsertActions(atoms, event) {
    const isFirstLineSlice = event.startCol !== 0 || event.startRow === event.endRow;
    let actions = [];

    actions.push(setLine(event.startRow,
        insertTextToAtom(atoms.get(event.startRow), isFirstLineSlice ? event.startCol : 0, event.text[0])));

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

function generateRemoveActions(atoms, event) {
    const {startCol, endCol, startRow, endRow} = event;
    let actions = [];

    if (startRow === endRow) { // Removing just a part of a line
        actions.push(setLine(startRow,
            removeTextFromAtom(atoms.get(startRow), startCol, endCol)));
        return actions;
    }

    let lastAtom = atoms.get(endRow);
    let tail = lastAtom.get('text').length > endCol ? lastAtom.get('text').slice(endCol, Number.MAX_VALUE) : '';

    actions.push(setLine(startRow,
        insertTextToAtom(removeTextFromAtom(atoms.get(startRow), startCol, Number.MAX_VALUE),
            Number.MAX_VALUE, tail)));

    // Removing all lines between startRow and endRow
    for (let i = endRow; i > startRow; i--) actions.push(removeLine(i));

    return actions;
}

// TODO: create a INSERT_LINE_INTERVAL and REMOVE_LINE_INTERVAL actions?
// TODO: with these we can use only reducers and operate with the state itself
// TODO: it can complicate column merging though
const textMiddleware = store => next => action => {
    switch (action.type) {
        case INSERT_EVENT:
            let actions = generateInsertActions(store.getState().text, action.payload);
            store.dispatch(broadcastActions(actions));
            next(actions);
            break;
        case REMOVE_EVENT:
            actions = generateRemoveActions(store.getState().text, action.payload);
            store.dispatch(broadcastActions(actions));
            next(generateRemoveActions(store.getState().text, action.payload));
            break;
        default: next(action);
    }
};

export default textMiddleware;
