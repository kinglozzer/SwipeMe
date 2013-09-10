/*!
 * SwipeMe <IE9 support plugin
 * Author: Loz Calver
 *
 * Of course old IE doesn't support touch events, so this is just to enable the
 * manual swipe triggers to work in old browsers that don't support either
 * Array.indexOf() or String.trim()
 * 
 * Copyright 2013, MIT License
 */

// Array.indexOf prototype by MDN
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        'use strict';
        if (this === null) {
            throw new TypeError();
        }
        var n, k, t = Object(this),
            len = t.length >>> 0;

        if (len === 0) {
            return -1;
        }
        n = 0;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n !== 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

 (function() {
    "use strict";

    if (typeof window.SwipeMe !== 'function') return;

    SwipeMe.extend().utils.trim = function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    };
    SwipeMe.extend().utils.addClass = function(obj, cssClass) {
        var current = obj.className || '';
        var re = new RegExp("\\b" + cssClass + "\\b", 'g');

        if (current.match(re) === null) {
            obj.className = this.trim(current += ' ' + cssClass);
        }
    };
    SwipeMe.extend().utils.removeClass = function(obj, cssClass) {
        var current = obj.className || '';
        var re = new RegExp("\\b" + cssClass + "\\b", 'g');

        obj.className = this.trim(current.replace(re, ''));
    };
})();