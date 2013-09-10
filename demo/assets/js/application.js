// // Ensure indexOf is available
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
var swipe = new SwipeMe(
    document.getElementById('swipeme'),
    {
        accessClasses: {
            left: 'pull-right',
            right: 'pull-left'
        }
    }
);

function triggerLeft(event) {
    if (document.getElementById('swipeme').className.indexOf('pull-right') === -1) {
        swipe.swipe('right');
    } else {
        swipe.swipe('left');
    }

    if(event.preventDefault) event.preventDefault();
}

function triggerRight(event) {
    if (document.getElementById('swipeme').className.indexOf('pull-left') === -1) {
        swipe.swipe('left');
    } else {
        swipe.swipe('right');
    }

    if(event.preventDefault) event.preventDefault();
}

SyntaxHighlighter.all();