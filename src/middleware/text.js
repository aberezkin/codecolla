import {GET_ALL_TEXT, broadcastActions, broadcastActionsToPeer, 
    INSERT_EVENT, insertLine, REMOVE_EVENT, removeLine, setLine,
    SET_LINE, SEND_ALL_TEXT, SET_TEXT} from "../actions/index";
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
    let newText = oldText.slice(0, from) + oldText.slice(to);
    atom = getNewTimeForAtom(atom);
    return atom.set('text', newText);
}

function generateInsertActions(atoms, event) {
    const isFirstLineSlice = event.startCol !== 0 || event.startRow === event.endRow;
    const actions = [];

    actions.push(setLine(
        event.startRow,
        insertTextToAtom(
            atoms.get(event.startRow),
            isFirstLineSlice ? event.startCol : 0, event.text[0],
        ),
    ));

    for (let i = 0 + isFirstLineSlice; i < (event.text.length + isFirstLineSlice) - 1; i += 1) {
        const atom = {
            id: generateLineId(),
            text: event.text[i],
            time: 1,
        };
        actions.push(insertLine(event.startRow + i, atom));
    }

    return actions;
}

function generateRemoveActions(atoms, event) {
    const { startCol, endCol, startRow, endRow } = event;
    const actions = [];

    if (startRow === endRow) { // Removing just a part of a line
        actions.push(setLine(
            startRow,
            removeTextFromAtom(atoms.get(startRow), startCol, endCol),
        ));
        return actions;
    }

    const lastAtom = atoms.get(endRow);
    const tail = lastAtom.get('text').length > endCol ? lastAtom.get('text').slice(endCol, Number.MAX_VALUE) : '';

    actions.push(setLine(
        startRow,
        insertTextToAtom(
            removeTextFromAtom(atoms.get(startRow), startCol, Number.MAX_VALUE),
            Number.MAX_VALUE,
            tail,
        ),
    ));

    // Removing all lines between startRow and endRow
    for (let i = endRow; i > startRow; i -= 1) actions.push(removeLine(i));

    return actions;
}

// TODO: create a INSERT_LINE_INTERVAL and REMOVE_LINE_INTERVAL actions?
// TODO: with these we can use only reducers and operate with the state itself
// TODO: it can complicate column merging though
// eslint-disable-next-line arrow-parens
const textMiddleware = store => next => action => {
    switch (action.type) {
        case INSERT_EVENT: {
            let actions = generateInsertActions(store.getState().text, action.payload);
            actions.forEach(a => {
                a.payload.atom.peer = store.getState().peers.id;
            });
            store.dispatch(broadcastActions(actions));
            next(actions);
            break;
        }
        case REMOVE_EVENT: {
            const actions = generateRemoveActions(store.getState().text, action.payload);
            store.dispatch(broadcastActions(actions));
            next(generateRemoveActions(store.getState().text, action.payload));
            break;
        }
        case SET_LINE:
            const time = store.getState().text.get(action.payload.line).time;
            const line = store.getState().text.get(action.payload.line);
            if (action.payload.atom.time < time) {
                store.dispatch(broadcastActions(line));
                break;
            } else if ((action.payload.atom.time === time) && 
                (store.getState().peers.id > action.payload.atom.peer)) {
                store.dispatch(broadcastActions(line));
                break;
            }
            next(action);
            break;
        case SEND_ALL_TEXT:
            //Need some modifications.
            let setTextAction = {
                type: SET_TEXT,
                payload: store.getState().text
            }
            let actions = {
                id: action.payload,
                broadcastedAction: [setTextAction]
            }
            store.dispatch(broadcastActionsToPeer(actions));
            break;
        default: next(action);
    }
};

export default textMiddleware;
