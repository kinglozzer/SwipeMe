/*!
 * SwipeMe mouse support plugin
 * Author: Loz Calver
 *
 * To prevent mouse selection when dragging, apply the following CSS:
 * -webkit-touch-callout: none;
 * -webkit-user-select: none;
 * -khtml-user-select: none;
 * -moz-user-select: none;
 * -ms-user-select: none;
 * user-select: none;
 *
 * Copyright 2013, MIT License
 */
(function() {
    "use strict";

    if (typeof window.SwipeMe !== 'function') return;

    var events = {
        start: {},
        differences: {},
        isHorizontal: null,
        invalidTarget: false,
        mouseDown: false,
        handleEvent: function(event) {
            switch (event.type) {
                case 'mousedown':
                case 'onmousedown':
                    this.mousedown(event);
                    break;
                case 'mousemove':
                case 'onmousemove':
                    this.mousemove(event);
                    break;
                case 'mouseup':
                case 'onmouseup':
                    this.mouseup(event);
                    break;
            }
        },
        mousedown: function(event) {
            events.start = {
                x: (typeof event.pageX !== 'undefined') ? event.pageX : event.clientX,
                y: (typeof event.pageY !== 'undefined') ? event.pageY : event.clientY
            };

            var target = (typeof event.target !== 'undefined') ? event.target : window.event.srcElement;

            if (SwipeMe.extend().utils.parentUntilAttr(target, 'data-swipeme-ignore')) {
                events.invalidTarget = true;
            }

            events.mouseDown = true;
        },
        mousemove: function(event) {
            if ( ! events.mouseDown) return;
            
            events.differences = {
                x: ((typeof event.pageX !== 'undefined') ? event.pageX : event.clientX) - events.start.x,
                y: ((typeof event.pageY !== 'undefined') ? event.pageY : event.clientY) - events.start.y
            };

            if (events.isHorizontal === null) {
                events.isHorizontal = (Math.abs(events.differences.x) > Math.abs(events.differences.y));
            }
        },
        mouseup: function() {
            if (events.isHorizontal && ! events.invalidTarget) {
                var swipeDir = (events.differences.x > 0) ? 'right' : 'left';

                SwipeMe.extend().actions.swipe(swipeDir);
            }

            events.isHorizontal = null;
            events.invalidTarget = false;
            events.differences = {};
            events.mouseDown = false;
        }
    };
    
    if (window.addEventListener) {
        document.addEventListener('mousedown', events);
        document.addEventListener('mousemove', events);
        document.addEventListener('mouseup', events);
    } else if (document.attachEvent) {
        document.attachEvent('onmousedown', events.mousedown);
        document.attachEvent('onmousemove', events.mousemove);
        document.attachEvent('onmouseup', events.mouseup);
    }
})();