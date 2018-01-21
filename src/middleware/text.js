import { broadcastActions, broadcastActionsToPeer,
    INSERT_EVENT, insertLine, REMOVE_EVENT, removeLine, setLine,
    SET_LINE, SEND_ALL_TEXT, SET_TEXT, stepBackAddAction } from '../actions/index';
import { generateLineId } from '../utilities/Helpers';

function breakUpTextAtom(atom, pos, pasteText) {
    const oldText = atom.get('text');
    return atom.set('text', oldText.slice(0, pos) + pasteText);
}

function getNewTimeForAtom(atom) {
    const oldTime = atom.get('time');
    return atom.set('time', oldTime + 1);
}

function insertTextToAtom(atom, pos, pasteText) {
    const oldText = atom.get('text');
    const newAtom = getNewTimeForAtom(atom);
    console.log('first', oldText.slice(0, pos) + pasteText + oldText.slice(pos));
    return newAtom.set('text', oldText.slice(0, pos) + pasteText + oldText.slice(pos));
}

function removeTextFromAtom(atom, from = 0, to = Number.MAX_VALUE) {
    const oldText = atom.get('text');
    const newText = oldText.slice(0, from) + oldText.slice(to);
    const newAtom = getNewTimeForAtom(atom);
    //console.log('first', newText);
    return newAtom.set('text', newText);
}

function generateInsertActions(atoms, event) {
    const actions = [];

    let actionHistory = [];
    
    let tailOfText = '';
    //insert if many string, or insert \n
    if (event.text[0] === '' || event.text.length > 1) {
        actionHistory.push(setLine(event.startRow, 
            atoms.get(event.startRow)));

        const atom = atoms.get(event.startRow);
        actions.push(setLine(
            event.startRow,
            breakUpTextAtom(atom, 
                event.startCol, 
                event.text[0]),
        ));
        tailOfText = atom.get('text').slice(event.startCol);
    } else {
        actionHistory.push(setLine(event.startRow, 
            atoms.get(event.startRow)));

        actions.push(setLine(
            event.startRow,
            insertTextToAtom(
                atoms.get(event.startRow),
                event.startCol, 
                event.text[0],
            ),
        ));
    }
    for (let i = 1; i < event.text.length; i += 1) {
        const atom = {
            id: generateLineId(),
            text: i === event.text.length - 1 ?
                event.text[i] + tailOfText : event.text[i],
            time: 1,
        };
        actions.push(insertLine(event.startRow + i, atom));
        actionHistory.push(removeLine(event.startRow + 1));
    }
    return {
        actions: actions,
        actionHistory: actionHistory
    };
}

function generateRemoveActions(atoms, event) {
    const { startCol, endCol, startRow, endRow } = event;
    const actions = [];
    let actionHistory = [];

    if (startRow === endRow) { // Removing just a part of a line
        actionHistory.push(setLine(startRow, atoms.get(startRow)));

        actions.push(setLine(
            startRow,
            removeTextFromAtom(atoms.get(startRow), startCol, endCol),
        ));
        return {
            actions: actions,
            actionHistory: actionHistory
        };
    }

    const lastAtom = atoms.get(endRow);
    const tail = lastAtom.get('text').length > endCol ? lastAtom.get('text').slice(endCol, Number.MAX_VALUE) : '';

    actionHistory.push(setLine(startRow, atoms.get(startRow)));

    actions.push(setLine(
        startRow,
        insertTextToAtom(
            removeTextFromAtom(atoms.get(startRow), startCol, Number.MAX_VALUE),
            Number.MAX_VALUE,
            tail,
        ),
    ));

    // Removing all lines between startRow and endRow
    for (let i = endRow; i > startRow; i -= 1) {
        actionHistory.push(insertLine(i, atoms.get(i)));
        actions.push(removeLine(i));
    }

    return {
        actions: actions,
        actionHistory: actionHistory
    };
}

// TODO: create a INSERT_LINE_INTERVAL and REMOVE_LINE_INTERVAL actions?
// TODO: with these we can use only reducers and operate with the state itself
// TODO: it can complicate column merging though
// eslint-disable-next-line arrow-parens
const textMiddleware = store => next => action => {
    switch (action.type) {
        case INSERT_EVENT: {
            const actions = generateInsertActions(store.getState().text, action.payload);
            actions.actions.forEach((a) => {
                let newA = a;
                newA.payload.atom.peer = store.getState().peers.id;
                return newA;
            });
            store.dispatch(broadcastActions(actions.actions));

            store.dispatch(stepBackAddAction(actions.actionHistory));

            next(actions.actions);
            break;
        }
        case REMOVE_EVENT: {
            const actions = generateRemoveActions(store.getState().text, action.payload);
            store.dispatch(broadcastActions(actions.actions));

            store.dispatch(stepBackAddAction(actions.actionHistory));

            next(generateRemoveActions(store.getState().text, action.payload).actions);
            break;
        }
        case SET_LINE: {
            const { time } = store.getState().text.get(action.payload.line);
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
        }
        case SEND_ALL_TEXT: {
            // Need some modifications.
            const setTextAction = {
                type: SET_TEXT,
                payload: store.getState().text,
            };
            const actions = {
                id: action.payload,
                broadcastedAction: [setTextAction],
            };
            store.dispatch(broadcastActionsToPeer(actions));
            break;
        }
        default: next(action);
    }
};

export default textMiddleware;
