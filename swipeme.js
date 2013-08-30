/*
 * SwipeMe
 * Author: Loz Calver
 *
 * Copyright 2013, MIT License
 */
function SwipeMe(container, userOptions) {
    "use strict";

    var options = {
        accessClasses: {
            left: 'access-left',
            right: 'access-right'
        },
        direction: ['left', 'right']
    },
    utils = {
        prepClass: function(cssClass) {
            return (" " + cssClass + " ").replace(/[\t\r\n\f]/g, " ");
        },
        hasClass: function(obj, cssClass) {
            var className = " " + cssClass + " ";
            return (this.prepClass(obj.className).indexOf(className) >= 0);
        },
        addClass: function(obj, cssClass) {
            var current = (obj.className ? this.prepClass(obj.className) : "");

            if (current.indexOf(" " + cssClass + " ") < 0) {
                current += cssClass;
                obj.className = current.trim();
            }
        },
        removeClass: function(obj, cssClass) {
            var current = (obj.className ? this.prepClass(obj.className) : "");

            if (current) {
                while (current.indexOf(" " + cssClass + " ") >= 0) {
                    current = current.replace(" " + cssClass + " ", " ");
                }
                obj.className = current.trim();
            }
        },
        parentUntilAttr: function(obj, attr) {
            if (obj.getAttribute && obj.getAttribute(attr)) {
                return obj;
            } else if (obj.parentNode) {
                return this.parentUntilAttr(obj.parentNode, attr);
            } else {
                return false;
            }
        }
    },
    actions = {
        swipe: function(dir) {
            // We're accessing the opposite side to the direction we're swiping
            var access = (dir === 'left') ? 'right' : 'left';

            // If the opposite side is already open, close it
            if (utils.hasClass(container, options.accessClasses[dir])) {
                utils.removeClass(container, options.accessClasses[dir]);
            // If the side we're trying to expose isn't already open
            } else if ( ! utils.hasClass(container, options.accessClasses[access])) {
                // Check if we're allowed to expose the panel
                if (options.direction.indexOf(access) !== -1) {
                    utils.addClass(container, options.accessClasses[access]);
                }
            }
        }
    },
    events = {
        start: {},
        differences: {},
        isHorizontal: null,
        invalidTarget: false,
        handleEvent: function(event) {
            switch (event.type) {
                case 'touchstart':
                    this.touchstart(event);
                    break;
                case 'touchmove':
                    this.touchmove(event);
                    break;
                case 'touchend':
                    this.touchend(event);
                    break;
            }
        },
        touchstart: function(event) {
            var touch = event.touches[0];

            events.start = {
                x: touch.pageX,
                y: touch.pageY
            };

            if (utils.parentUntilAttr(touch.target, 'data-swipeme-ignore')) {
                events.invalidTarget = true;
            }
        },
        touchmove: function(event) {
            var touch = event.touches[0];

            events.differences = {
                x: touch.pageX - events.start.x,
                y: touch.pageY - events.start.y
            };

            if (events.isHorizontal === null) {
                events.isHorizontal = (Math.abs(events.differences.x) > Math.abs(events.differences.y));
            }

            if (events.isHorizontal) {
                event.preventDefault();
            }
        },
        touchend: function() {
            if (events.isHorizontal && ! events.invalidTarget) {
                var swipeDir = (events.differences.x > 0) ? 'right' : 'left';

                actions.swipe(swipeDir);
            }

            events.isHorizontal = null;
            events.invalidTarget = false;
            events.differences = {};
        }
    };

    function setup(userOptions) {
        var opt;
        for (opt in options) {
            if (typeof userOptions[opt] !== 'undefined') {
                options[opt] = userOptions[opt];
            }
        }
        
        if (typeof options.direction === 'string') {
            options.direction = [options.direction];
        }
    }

    setup(userOptions);

    if (window.addEventListener) {
        document.addEventListener('touchstart', events);
        document.addEventListener('touchmove', events);
        document.addEventListener('touchend', events);
    }

    return {
        swipe: function(dir) {
            dir = (dir === 'left') ? 'left' : 'right';
            actions.swipe(dir);
        }
    };
}