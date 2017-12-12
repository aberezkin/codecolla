import {Map} from 'immutable';

export function getPageHeight () {
    return document.documentElement.clientHeight;
}

export function generateLineId() {
    let ID = '';
    //ASCII 33 - 126
    for (let i = 0; i < 15; ++i) {
        ID += String.fromCharCode(Math.floor(Math.random() * (127 - 33) + 33));
    }

    return ID;
}

export function generateAtom(text, time) {
    return Map({
        id: generateLineId(),
        text,
        time
    });
}

export function generateCursorMarker(session, pos) {
    let marker = {};
    marker.cursors = [pos];
    /// Function keyword used purposefully this should point to marker
    marker.update = function (html, markerLayer, session, config) {
        let start = config.firstRow, end = config.lastRow;
        this.cursors
            .filter((pos) => pos.row >= start && pos.row <= end)
            .forEach((pos) => {
                let screenPos = session.documentToScreenPosition(pos);

                let height = config.lineHeight;
                let width = config.characterWidth;
                let top = markerLayer.$getTop(screenPos.row, config);
                let left = markerLayer.$padding + screenPos.column * width;
                // can add any html here
                html.push(
                    `<div style='
                        position: absolute;
                        border-left: 2px solid gold;
                        height: ${height}px;
                        top: ${top}px;
                        left: ${left}px; 
                        width:${width}px'></div>`
                );
            });
    };
    marker.redraw = function() { this.session._signal("changeFrontMarker");};
    marker.addCursor = function() { this.redraw(); };
    marker.session = session;
    marker.session.addDynamicMarker(marker, true);
    return marker;
}

export function generateSetterReducer(actionType, defaultValue) {
    return (state = defaultValue, action) => action.type === actionType ? action.payload : state;
}
