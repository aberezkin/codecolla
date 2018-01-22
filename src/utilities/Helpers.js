import { Map } from 'immutable';

export function getPageHeight() {
    return document.documentElement.clientHeight;
}

export function getPageWidth() {
    return document.documentElement.clientWidth;
}

export function generateLineId() {
    let ID = '';
    // ASCII 33 - 126
    for (let i = 0; i < 15; i += 1)
        ID += String.fromCharCode((Math.floor(Math.random() * (127 - 33)) + 33));

    return ID;
}

export function generateAtom(text, time) {
    return Map({
        id: generateLineId(),
        text,
        time,
    });
}

export function generateCursorMarker(session, pos) {
    const marker = {};
    marker.cursors = [pos];
    // Function keyword used purposefully this should point to marker
    /* eslint-disable no-shadow */
    marker.update = function update(html, markerLayer, session, config) {
        const start = config.firstRow;
        const end = config.lastRow;

        this.cursors
            .filter(pos => pos.row >= start && pos.row <= end)
            .forEach((pos) => {
                const screenPos = session.documentToScreenPosition(pos);

                const height = config.lineHeight;
                const width = config.characterWidth;
                const top = markerLayer.$getTop(screenPos.row, config);
                const left = markerLayer.$padding + (screenPos.column * width);
                // can add any html here
                html.push(`<div style='
                        position: absolute;
                        border-left: 2px solid gold;
                        height: ${height}px;
                        top: ${top}px;
                        left: ${left}px; 
                        width:${width}px'></div>`);
            });
    };
    /* eslint-enable no-shadow */
    /* eslint-disable no-underscore-dangle */
    marker.redraw = function redraw() { this.session._signal('changeFrontMarker'); };
    /* eslint-enable no-underscore-dangle */
    marker.addCursor = function addCursor() { this.redraw(); };
    marker.session = session;
    marker.session.addDynamicMarker(marker, true);
    return marker;
}

export function generateSetterReducer(actionType, defaultValue) {
    return (state = defaultValue, action) => (action.type === actionType ? action.payload : state);
}

export function atomsToString(atoms) {
    return atoms.map(atom => atom.get('text'))
        .join('\n');
}
