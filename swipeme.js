/*!
 * SwipeMe
 * Author: Loz Calver
 *
 * Copyright 2013, MIT License
 */
(function SwipeMe() {
    "use strict";

    var container,
        options = {
        accessClasses: {
            left: 'access-left',
            right: 'access-right'
        },
        direction: ['left', 'right']
    },
    utils = {
        hasClass: function(obj, cssClass) {
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');
            return (obj.className.match(re) !== null);
        },
        addClass: function(obj, cssClass) {
            var current = obj.className || '';
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');

            if (current.match(re) === null) {
                obj.className = (current += ' ' + cssClass).trim();
            }
        },
        removeClass: function(obj, cssClass) {
            var current = obj.className || '';
            var re = new RegExp("\\b" + cssClass + "\\b", 'g');

            obj.className = current.replace(re, '').trim();
        },
        parentUntilAttr: function(obj, attr) {
            if (obj.getAttribute && obj.getAttribute(attr)) {
                return obj;
            } else if (obj.parentNode) {
                return this.parentUntilAttr(obj.parentNode, attr);
            }
            return false;
        }
    },
    actions = {
        swipe: function(dir) {
            // We're accessing the opposite side to the direction we're swiping
            var access = (dir === 'left') ? 'right' : 'left';

            // If the opposite side is already open, close it
            if (utils.hasClass(container, options.accessClasses[dir])) {
                utils.removeClass(container, options.accessClasses[dir]);
            } else if ( ! utils.hasClass(container, options.accessClasses[access]) && options.direction.indexOf(access) !== -1) {
            // If the side we're trying to expose isn't already open and if we're allowed to expose the panel
                utils.addClass(container, options.accessClasses[access]);
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

            if (events.isHorizontal && ! events.invalidTarget) {
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

    function setup(cont, userOptions) {
        container = cont;

        var opt;
        for (opt in options) {
            if (typeof userOptions[opt] !== 'undefined') {
                options[opt] = userOptions[opt];
            }
        }

        if (typeof options.direction === 'string') {
            options.direction = [options.direction];
        }

        return {
            swipe: function(dir) {
                // if dir is undefined assume left as is most common
                dir = dir || 'left';
                actions.swipe(dir);
            }
        };
    }

    if (window.addEventListener) {
        document.addEventListener('touchstart', events);
        document.addEventListener('touchmove', events);
        document.addEventListener('touchend', events);
    }

    window.SwipeMe = setup;
    window.SwipeMe.extend = function() {
        return {
            container: container,
            options: options,
            utils: utils,
            actions: actions,
            events: events
        };
    };
})();