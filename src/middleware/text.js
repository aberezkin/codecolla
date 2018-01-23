import { broadcastActions, broadcastActionsToPeer, SAVE_AS, setLanguage,
    INSERT_EVENT, insertLine, REMOVE_EVENT, removeLine, setLine,
    SET_LINE, SEND_ALL_TEXT, SET_TEXT, OPEN_URL, setText } from '../actions/index';
import { generateLineId } from '../utilities/Helpers';

const LANGS_EXTENSION = new Map([
    ['python'     ,  '.py'],
    ['ruby'       ,  '.rb'],
    ['clojure'    , '.clj'],
    ['php'        , '.php'],
    ['javascript' ,  '.js'],
    ['scala'      ,  '.sc'],
    ['go'         ,  '.go'],
    ['c_cpp'      , '.cpp'],
    ['java'       ,'.java'],
    ['VB.NET'     ,  '.vb'],
    ['csharp'     ,  '.cs'],
    ['sh'         ,  '.sh'],
    ['Objective-C',   '.c'],
    ['sql'      , '.sql'],
    ['perl'       ,  '.pl'],
    ['rust'       ,  '.rs'],
]);

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
    return newAtom.set('text', oldText.slice(0, pos) + pasteText + oldText.slice(pos));
}

function removeTextFromAtom(atom, from = 0, to = Number.MAX_VALUE) {
    const oldText = atom.get('text');
    const newText = oldText.slice(0, from) + oldText.slice(to);
    const newAtom = getNewTimeForAtom(atom);
    return newAtom.set('text', newText);
}

function generateInsertActions(atoms, event) {
    const actions = [];
    // if insert /n in middle of line
    let tailOfText = '';
    if (event.text[0] === '' || event.text.length > 1) {
        const atom = atoms.get(event.startRow);
        actions.push(setLine(
            event.startRow,
            breakUpTextAtom(atom, 
                event.startCol, 
                event.text[0]),
        ));
        tailOfText = atom.get('text').slice(event.startCol);
    } else {
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
            const actions = generateInsertActions(store.getState().text, action.payload);
            actions.forEach((a) => {
                const newA = a;
                newA.payload.atom.peer = store.getState().peers.id;
                return newA;
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
            const setTextAction = {
                type: SET_TEXT,
                payload: store.getState().text,
            };
            store.dispatch(broadcastActionsToPeer(action.payload, setTextAction));
            break;
        }
        case SAVE_AS: {
            const textToSave = state => state.text.toArray().map(i => i.toObject().text).join('\n');
        
            let textToSaveAsBlob = new Blob([textToSave], {type:'text/plain'});
            let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
            let fileNameToSaveAs = 'newfile' + 
                LANGS_EXTENSION.get(store.getState().preferences.editor.language);
         
            let downloadLink = document.createElement('a');
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = 'Download File';
            downloadLink.href = textToSaveAsURL;
            downloadLink.onclick = this.destroyClickedElement;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
         
            downloadLink.click();
            
            break;
        }
        case OPEN_URL: {
            let setAction = setText(action.payload) 
            store.dispatch(setAction);
            store.dispatch(broadcastActions([setAction]));
            break;
        }
        default: next(action);
    }
};

export default textMiddleware;
