import AceEditor from 'react-ace';

class CRDTControl {
    constructor() {
    }

    setIsPermissionToTransferFunc(e) {
        this.isTransferAllowed = e;
    }
	
	setEditor(e) {
		this.editor = e;
	}

    init() {
        let text =  this.editor.getSession().getValue();
        let textToStrings = text.split('\n');
        
        this.atoms = new Map();

        for(let i = 0; i < textToStrings.length; ++i) {
            let ID = '';
            //ASCII 33 - 126
            for (let i = 0; i < 15; ++i) {
                ID += String.fromCharCode(Math.floor(Math.random() * (127 - 33)+33));
            }
            let e = {
                id: ID,
                y: i,
                text: textToStrings[i], 
                time: 1
            };
            this.atoms.set(ID, e);
        }

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
        let sendPack = [];
        if (e.startCol === 0 && e.startRow !== e.endRow) {
            
            let endID = 0;
            for (let [key, value] of this.atoms) {
                if (value.y === e.startRow) {
                    endID = key;
                }
            }
            let atom = this.atoms.get(endID);
            atom.y += (e.endRow - e.startRow);
            atom.text = this.editor.session.getLine(atom.y);
            this.atoms.set(atom.id, atom);
            sendPack.push(JSON.stringify({action : 'replace', data : this.getAtomData(atom)}));

            for (let [key, value] of this.atoms) {
                if (value.y > e.endRow && value.y > 0) {
                    var a = this.atoms.get(key);
                    a.y += (e.endRow - e.startRow);
                    this.atoms.set(key, a);
                }
            }

            for (let i = 0; i < e.text.length-1; ++i) {
                let ID = '';
                //ASCII 33 - 126
                for (let i = 0; i < 15; ++i) {
                    ID += String.fromCharCode(Math.floor(Math.random() * (127 - 33)+33));
                }
                this.atoms.set(ID, {
                    id: ID,
                    y: e.startRow+i,
                    text: this.editor.session.getLine(e.startRow+i), 
                    time: 1
                });
                sendPack.push(JSON.stringify({action : 'insert', data : this.getAtomData(this.atoms.get(ID))}));
            }
        } else {//change first
            let startID = 0;
            for (let [key, value] of this.atoms) {
                if (value.y === e.startRow) {
                    startID = key;
                }
            }

            let atom = this.atoms.get(startID);
            atom.text = this.editor.session.getLine(atom.y);
            this.atoms.set(atom.id, atom);
            sendPack.push(JSON.stringify({action : 'replace', data : this.getAtomData(atom)}));

            for (let [key, value] of this.atoms) {
                if (value.y > e.startRow) {
                    let atom = this.atoms.get(key);
                    atom.y += (e.endRow - e.startRow);
                    this.atoms.set(key, atom);
                }
            }

            for (let i = 1; i < e.text.length; ++i) {
                let ID = '';
                //ASCII 33 - 126
                for (let i = 0; i < 15; ++i) {
                    ID += String.fromCharCode(Math.floor(Math.random() * (127 - 33)+33));
                }

                this.atoms.set(ID, {
                    id: ID,
                    y: e.startRow+i,
                    text: this.editor.session.getLine(e.startRow+i), 
                    time: 1
                });

                sendPack.push(JSON.stringify({action : 'insert', data : this.getAtomData(this.atoms.get(ID))}));
                startID = ID;
            }
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
                sendPack.push(JSON.stringify({action : 'replace', data : this.getAtomData(atom)}));

                for (let [key, value] of this.atoms) {
                    if (value.y >= e.startRow && value.y < e.endRow && key !== atom.id) {
                        sendPack.push(JSON.stringify({action : 'remove', data : this.getAtomData(this.atoms.get(key))}));
                        this.atoms.delete(key);
                    }
                }
                for (let [key, value] of this.atoms) {
                    if (value.y > e.endRow) {
                        let a = this.atoms.get(key);
                        a.y -= (e.endRow - e.startRow);
                        this.atoms.set(key, a);
                    }
                }
        } else {
            let startID = 0;
            for (let [key, value] of this.atoms) {
                if (value.y === e.startRow) {
                    startID = key;
                }
            }

            let atom = this.atoms.get(startID);
            a.text = this.getLine(a.y);
            this.atoms.set(a.id, a);
            sendPack.push(JSON.stringify({action : 'replace', data : this.getAtomData(a)}));
            
            for (let [key, value] of this.atoms) {
                if (value.y > e.startRow && value.y <= e.endRow && key != a.id) {
                    sendPack.push(JSON.stringify({action : 'remove', data : this.getAtomData(this.atoms.get(key))}));
                    this.atoms.delete(key);
                }
            }
            for (let [key, value] of this.atoms) {
                if (value.y > e.endRow) {
                    let a = this.atoms.get(key);
                    a.y -= (e.endRow - e.startRow);
                    this.atoms.set(key, a);
                }
            }
        }
        return sendPack;
    }

    insertEvent(e) {
        e.sort(function(a, b) {
            return a.data.y - b.data.y;
        });
        console.log("SORTED>> " + e[0].data.y + " " + e[e.length-1].data.y);
		
        this.isTransferAllowed(false);
        for (let i = 0; i < e.length; ++i) {
            if (e[i].action === 'insert') {
                this.atoms.set(e[i].data.id, e[i].data);
                for (let [key, value] of this.atoms) {
                    if (value.y > e[i].data.y) {
                        let a = this.atoms.get(key);
                        a.y ++;
                        this.atoms.set(key, a);
                    }
                }
                let cursorPosition = this.editor.getCursorPosition();

                this.editor.session.insert({row:e[i].data.y, column:0}, e[i].data.text + 
                    ((i < e.length-1) ? '\n' : ''));
                    this.editor.selection.moveTo(cursorPosition.row++, cursorPosition.col);
            }

            if (e[i].action === 'remove') {
                this.atoms.delete(e[i].data.id);
                for (var [key, value] of this.atoms) {
                    if (value.y > e[i].data.y) {
                        var a = this.atoms.get(key);
                        a.y--;
                        this.atoms.set(key, a);
                    }
                }
                let cursorPosition = this.editor.getCursorPosition();
                
                let rng = {start: {row: (e[i].data.y>0)?e[i].data.y-1:e[i].data.y, column: (e[i].data.y>0)?Number.MAX_VALUE:0}, 
                    end: {row: e[i].data.y, column: Number.MAX_VALUE}};
                this.editor.session.remove(rng);
                this.moveTo(cursorPosition.row--, cursorPosition.col);
            }

            if (e[i].action === 'replace') {
                this.atoms.set(e[i].data.id, e[i].data);

                let cursorPosition = this.editor.getCursorPosition();

                let rng = {start: {row: e[i].data.y, column: 0},
                    end: {row: e[i].data.y, column: Number.MAX_VALUE}};
                if ((i > 0 && e[i-1].action === 'remove') || (i < e.length-1 && e.length > 1 && e[i+1].action === 'remove')) {
                    this.editor.session.replace(rng, e[i].data.text);
                } else {
                    this.editor.session.replace(rng, e[i].data.text + ((i < e.length-1 && e.length > 1) ? '\n' : ''));
                }
                this.editor.selection.moveTo(cursorPosition.row, cursorPosition.col-e[i].data.text.length);
            }
        }
        this.isTransferAllowed(true);
    }
}

export default CRDTControl;
