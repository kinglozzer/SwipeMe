#SwipeMe#
###A lightweight Javascript library for swiping open/close off-canvas menus###

SwipeMe is a Javascript library built to swipe open/close off-canvas navigation menus – currently relying on CSS3 animations. When a swipe is detected, SwipeMe will add (or remove) the appropriate CSS class from a main 'container' element. For an in-depth example of how to implement an off-canvas navigation pattern, see [this brilliant example](http://jasonweaver.name/lab/offcanvas/) by Jason Weaver.

##Implementation##

Simply set up your CSS rules and pass SwipeMe the element that contains each of your panels:

###HTML###

``` html
<div id="swipeme">
    <div class="panel off-canvas-left">Left off-canvas</div>
    <div class="panel main-content">Main content</div>
    <div class="panel off-canvas-right">Right off-canvas</div>
</div>
```

###CSS###
``` css
/* Base styles */
.panel {
	float: left;
	transition: margin 0.4s ease-out;
}

.off-canvas-left {
	width: 85%;
	margin-left: -100%;
}

.main-content {
	width: 100%;
	margin-left: 0;
}

.off-canvas-right {
	margin-right: -200%;
	width: 85%;
}

/* Access left menu */
.access-left .off-canvas-left	{ margin-left: 0;		}
.access-left .main-content		{ margin-right: -100%;	}
.access-left .off-canvas-right	{ margin-left: 100%;	}

/* Access right menu */
.access-right .off-canvas-left	{ margin-left: -100%;	}
.access-right .main-content		{ margin-left: -85%;	}
.access-right .off-canvas-right	{ margin-left: 0;		}
```

###JavaScript###
``` js
var swipe = new SwipeMe(document.getElementById('swipeme'));
```

##Customisation##
###Options###
``` js
var swipe = new SwipeMe(
	document.getElementById('swipeme'),
	{
	    accessClasses: {
	        left: 'access-left',
	        right: 'access-right'
	    },
	    direction: ['left', 'right']
	}
);
```

- `accessClasses`: An object containing the classes that will be applied to the container when a swipe has occurred
- `direction`: An array of available directions, useful for specifying if you only have a menu on one side. Also accepts a string.

###Disabling SwipeMe on certain elements###
You may wish to prevent SwipeMe from triggering a swipe event when touching certain elements on a page – a common example being an image carousel. Simply add a `data-swipeme-ignore="true"` attribute to prevent swipe events being triggered when the element, or any of its child elements, are touched.

##Caveats##
###Browser Support###
As the library currently only adds and removes CSS classes, all animations are CSS-generated – so <=IE9 and Opera Mini won't get any animations. Ancient versions of IE (<IE9) will need to use the `swipeme.ltie9.js` plugin to provide `Array.indexOf()` and `String.trim()` support.

###Windows Phone###
Currently not supported as it doesn't support `touchstart`/`touchmove`/`touchend` events. Need to delve deeper into MSPointerEvents etc. A pull request for support would be gratefully accepted.

###iOS 7###
iOS 7 adds swipe navigation gestures to Safari, which (as far as I'm aware) can't be disabled. It's still possible to use this library with iOS 7 – the native gestures are only triggered when swiping from the very edge of the page.

##TODO##

- Further device testing. Tested so far on:
  - iOS 5
  - iOS 6
  - iOS 7
  - Android 4.x
- Windows Phone support