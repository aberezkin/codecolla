import { broadcastActions, broadcastActionsToPeer, setLanguage,
    INSERT_EVENT, insertLine, REMOVE_EVENT, removeLine, setLine,
    SET_LINE, SEND_ALL_TEXT, SET_TEXT, OPEN_FILE, SET_FILE,
    setText } from '../actions/index';
import { generateLineId } from '../utilities/Helpers';

const EXTENSION_LANGS = new Map([
    [ '.py', 'python'     ],
    [ '.rb', 'ruby'       ],
    ['.clj', 'clojure'    ],
    ['.php', 'php'        ],
    [ '.js', 'javascript' ],
    [ '.sc', 'scala'      ],
    [ '.go', 'go'         ],
    ['.cpp', 'c_cpp'      ],
    [  '.h', 'c_cpp'      ],
    ['.java','java'       ],
    [ '.vb', 'VB.NET'     ],
    [ '.cs', 'csharp'     ],
    [ '.sh', 'sh'         ],
    [  '.c', 'Objective-C'],
    ['.sql', 'mysql'      ],
    [ '.pl', 'perl'       ],
    [ '.rs', 'rust'       ],
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
    const isFirstLineSlice = event.startCol !== 0 || event.startRow === event.endRow;
    const actions = [];
    // if insert /n in middle of line
    let tailOfText = '';
    if (event.text[0] === '' || event.text.length > 1) {
        const atom = atoms.get(event.startRow);
        const pos = isFirstLineSlice ? event.startCol : 0;
        actions.push(setLine(
            event.startRow,
            breakUpTextAtom(atom, pos, event.text[0]),
        ));
        tailOfText = atom.get('text').slice(pos);
    } else
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
            text: i === (event.text.length + isFirstLineSlice) - 2 ?
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
        case OPEN_FILE: {
            let openFile = document.getElementById('openFile');
            openFile.click();
            break;
        }
        case SET_FILE: {
            var text = '';
            let files = action.payload;
            if(files.length) {
                let reader = new FileReader();
                reader.onload = function(e) {
                    text = e.target.result;
                };
                
                reader.onloadend = function(e) {
                    let setAction = setText(text) 
                    store.dispatch(setAction);
                    store.dispatch(broadcastActions([setAction]));
                }
                let nameFmt = files[0].name.substr(files[0].name.indexOf('.')); 
 +              store.dispatch(setLanguage(EXTENSION_LANGS.get(nameFmt)));
                reader.readAsBinaryString(files[0]);
                
            }
            break;
        }
        default: next(action);
    }
};

export default textMiddleware;
