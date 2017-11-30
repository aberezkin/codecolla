import {generateLineId} from "./Helpers";
import {EDIT_INSERT, EDIT_REMOVE, EDIT_REPLACE} from "./Peers/Peer"

class CRDTControl {
    constructor() { }

    setIsPermissionToTransferFunc(e) {
        this.isTransferAllowed = e;
    }
	
	setEditor(e) {
		this.editor = e;
	}

	addAtom(y, text, time) {
        let ID = generateLineId();
        this.atoms.set(ID, {
            id: ID,
            y: y,
            text: text,
            time: time,
        });
        return ID;
    }

    atomShift(shift, condition = atom => true) {
        this.atoms.forEach(atom => atom.y += condition(atom) ? shift : 0);
    }

    init() {
        let text =  this.editor.getSession().getValue();
        let textByStrings = text.split('\n');
        
        this.atoms = new Map();

        textByStrings.forEach((string, i) => {
            this.addAtom(i, textByStrings[i], 1)
        });
    }
    
    getAtomData(atom) {
        return {
            id: atom.id,
            y: atom.y,
            text: atom.text,
            time: atom.time
        };
    }

    insert(e) {
        console.log(e);

        let sendPack = [];

        const isFirstLine = e.startCol !== 0 || e.startRow === e.endRow;

        let atom;
        this.atoms.forEach(a => atom = a.y === e.startRow ? a : atom);
        atom.y += isFirstLine ? 0 : (e.endRow - e.startRow);
        atom.text = this.editor.session.getLine(atom.y);

        sendPack.push({action: EDIT_REPLACE, data : this.getAtomData(atom)});
        const predicate = isFirstLine ?
            atom => atom.y > e.startRow :
            atom => atom.y > e.endRow && atom.y > 0;
        this.atomShift(e.endRow - e, predicate);

        for (let i = 0 + isFirstLine; i < e.text.length + isFirstLine - 1; ++i) {
            let ID = this.addAtom(e.startRow + i, this.editor.session.getLine(e.startRow + i), 1);
            sendPack.push({
                action : EDIT_INSERT,
                data : this.getAtomData(this.atoms.get(ID))
            });
        }

        return sendPack;
    }

    remove(e) {
        let sendPack = [];
        if (e.startCol === 0 &&
            e.endCol !== this.editor.session.getLine(e.endRow-(e.endRow - e.startRow)).length) {

            let endID = 0;
            for (let [key, value] of this.atoms) {
                if (value.y === e.endRow) {
                    endID = key;
                }
            }

            let atom = this.atoms.get(endID);
            atom.y -= (e.endRow - e.startRow);
            atom.text = this.editor.session.getLine(atom.y);
            this.atoms.set(atom.id, atom);
            sendPack.push({action: EDIT_REPLACE, data: this.getAtomData(atom)});

            for (let [key, value] of this.atoms) {
                if (value.y >= e.startRow && value.y < e.endRow && key !== atom.id) {
                    sendPack.push({action: EDIT_REMOVE, data: this.getAtomData(this.atoms.get(key))});
                    this.atoms.delete(key);
                }
            }

            this.atomShift(e.startRow - e.endRow, atom => atom.y > e.endRow);


        } else {
            let startID = 0;
            for (let [key, value] of this.atoms) {
                if (value.y === e.startRow) {
                    startID = key;
                }
            }

            let atom = this.atoms.get(startID);
            atom.text = this.editor.session.getLine(atom.y);
            this.atoms.set(atom.id, atom);
            sendPack.push({action : EDIT_REPLACE, data : this.getAtomData(atom)});
            
            for (let [key, value] of this.atoms) {
                if (value.y > e.startRow && value.y <= e.endRow && key !== atom.id) {
                    sendPack.push({action : EDIT_REMOVE, data : this.getAtomData(this.atoms.get(key))});
                    this.atoms.delete(key);
                }
            }

            this.atomShift(e.startRow - e.endRow, atom => atom.y > e.endRow);
        }
        return sendPack;
    }

    insertEvent(e) {
        e.sort(function(a, b) {
            return a.data.y - b.data.y;
        });

        this.isTransferAllowed(false);

        for (let i = 0; i < e.length; ++i) {
            switch (e[i].action) {
                case EDIT_INSERT: {
                    this.atoms.set(e[i].data.id, e[i].data);
                    this.atomShift(1, atom => atom.y > e[i].data.y);

                    let cursorPosition = this.editor.getCursorPosition();

                    this.editor.session.insert({
                        row: e[i].data.y,
                        column:0
                    }, e[i].data.text + ((i < e.length-1) ? '\n' : ''));

                    this.editor.selection.moveTo(cursorPosition.row++, cursorPosition.col);
                    break;
                }
                case EDIT_REMOVE: {
                    this.atoms.delete(e[i].data.id);
                    this.atomShift(e.startRow - e.endRow, atom => atom.y > e[i].data.y);

                    let cursorPosition = this.editor.getCursorPosition();

                    let rng = {
                        start: {
                            row: (e[i].data.y > 0) ? e[i].data.y - 1 : e[i].data.y,
                            column: (e[i].data.y > 0) ? Number.MAX_VALUE : 0
                        },
                        end: {
                            row: e[i].data.y,
                            column: Number.MAX_VALUE}
                    };

                    this.editor.session.remove(rng);
                    this.editor.selection.moveTo(cursorPosition.row--, cursorPosition.col);
                    break;
                }
                case EDIT_REPLACE: {
                    this.atoms.set(e[i].data.id, e[i].data);

                    let cursorPosition = this.editor.getCursorPosition();

                    let rng = {
                        start: {
                            row: e[i].data.y,
                            column: 0
                        },
                        end: {
                            row: e[i].data.y,
                            column: Number.MAX_VALUE
                        }
                    };

                    if ((i > 0 && e[i-1].action === EDIT_REMOVE) || (i < e.length-1 && e.length > 1 && e[i+1].action === EDIT_REMOVE)) {
                        this.editor.session.replace(rng, e[i].data.text);
                    } else {
                        this.editor.session.replace(rng, e[i].data.text + ((i < e.length-1 && e.length > 1) ? '\n' : ''));
                    }
                    this.editor.selection.moveTo(cursorPosition.row, cursorPosition.col-e[i].data.text.length);
                    break
                }
            }
        }

        this.isTransferAllowed(true);
    }
}

export default CRDTControl;
