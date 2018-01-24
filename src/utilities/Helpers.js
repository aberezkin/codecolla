import { Map } from 'immutable';

function djb2(str){
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
}


function stringToColor(str) {
    let hash = djb2(str);
    let r = (hash & 0xFF0000) >> 16;
    let g = (hash & 0x00FF00) >> 8;
    let b = hash & 0x0000FF;
    return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}


export function toggleFullScreen() {
    if (!document.fullScreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
}

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

export function generateCursorMarker(session, pos, name) {
    const marker = {};
    marker.cursors = [pos];

    let hash = stringToColor(name);
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
                        border-left-width: 2px;
                        border-left-style: solid;
                        border-left-color: ${hash};
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
