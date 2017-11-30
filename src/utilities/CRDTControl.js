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

    findAtom(predicate) {
        let atom;
        this.atoms.forEach(a => atom = predicate(a) ? a : atom);
        return atom || null;
    }

    atomShift(shift, condition = atom => true) {
        console.log("SHIFT: ", shift);
        console.log(Array.from(this.atoms.values()));
        this.atoms.forEach(atom => atom.y += condition(atom) ? shift : 0);
        console.log(Array.from(this.atoms.values()));
    }

    init() {
        let text =  this.editor.getSession().getValue();
        let textByStrings = text.split('\n');
        
        this.atoms = new Map();

        textByStrings.forEach((string, i) => {
            this.addAtom(i, string, 1)
        });
    }

    insert(e) {
        const isFirstLine = e.startCol !== 0 || e.startRow === e.endRow;

        let atom = this.findAtom(a => a.y === e.startRow);

        const predicate = isFirstLine ?
            atom => atom.y > e.startRow :
            atom => atom.y >= e.endRow && atom.y > 0;
        this.atomShift(e.endRow - e.startRow, predicate);

        atom.y += isFirstLine ? 0 : (e.endRow - e.startRow);
        atom.text = this.editor.session.getLine(atom.y);

        let sendPack = [];
        sendPack.push({action: EDIT_REPLACE, data : atom});
        for (let i = 0 + isFirstLine; i < e.text.length + isFirstLine - 1; ++i) {
            let ID = this.addAtom(e.startRow + i, this.editor.session.getLine(e.startRow + i), 1);
            sendPack.push({
                action : EDIT_INSERT,
                data : this.atoms.get(ID)
            });
        }

        return sendPack;
    }

    remove(e) {
        let sendPack = [];
        if (e.startCol === 0 && e.endCol !== this.editor.session.getLine(e.startRow).length) {

            let atom = this.findAtom(a => a.y === e.endRow);
            atom.y -= (e.endRow - e.startRow);
            atom.text = this.editor.session.getLine(atom.y);
            sendPack.push({action: EDIT_REPLACE, data: atom});

            for (let [key, value] of this.atoms) {
                if (value.y >= e.startRow && value.y < e.endRow && key !== atom.id) {
                    sendPack.push({action: EDIT_REMOVE, data: this.atoms.get(key)});
                    this.atoms.delete(key);
                }
            }

            this.atomShift(e.startRow - e.endRow, atom => atom.y > e.endRow);


        } else {
            let atom = this.findAtom(a => a.y === e.startRow);
            atom.text = this.editor.session.getLine(atom.y);
            sendPack.push({action : EDIT_REPLACE, data : atom});
            
            for (let [key, value] of this.atoms) {
                if (value.y > e.startRow && value.y <= e.endRow && key !== atom.id) {
                    sendPack.push({action : EDIT_REMOVE, data : this.atoms.get(key)});
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
