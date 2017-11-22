import AceEditor from 'react-ace';

import ChangeEvent from '../Editor/ChangeEvent';


class CursorManager {

    constructor() {
        this.cursors= new Map();
        this.add = this.add.bind(this);
        this.del = this.del.bind(this);
    }

    add(peer, pos) {
        var marker = {}
        marker.cursors = [pos]
        marker.update = function(html, markerLayer, session, config) {
            var start = config.firstRow, end = config.lastRow;
            var cursors = this.cursors
            for (var i = 0; i < cursors.length; i++) {
                var pos = this.cursors[i];
                if (pos.row < start) {
                    continue
                } else if (pos.row > end) {
                    break
                } else {
                    // compute cursor position on screen
                    // this code is based on ace/layer/marker.js
                    var screenPos = session.documentToScreenPosition(pos)
        
                    var height = config.lineHeight;
                    var width = config.characterWidth;
                    var top = markerLayer.$getTop(screenPos.row, config);
                    var left = markerLayer.$padding + screenPos.column * width;
                    // can add any html here
                    html.push(
                        "<div style='",
                        "position: absolute;",
                        "border-left: 2px solid gold;",
                        "height:", height, "px;",
                        "top:", top, "px;",
                        "left:", left, "px; width:", width, "px'></div>"
                    );
                }
            }
        }
        marker.redraw = function() {
           this.session._signal("changeFrontMarker");
        }
        marker.addCursor = function() {
            marker.redraw();
        }
        marker.session = editor.session;
        marker.session.addDynamicMarker(marker, true);
        console.log('Cursor: '+peer + ' ' + marker.id);
        this.cursors.set(peer, marker.id);
    }

    del(peer) {
        console.log('__Cursor: '+peer + ' ' + this.cursors.get(peer));
        window.editor.session.removeMarker(this.cursors.get(peer));
    }

    move(peer, pos) {
        this.del(peer);
        this.add(peer, pos);
    }
    
}

export default CursorManager;