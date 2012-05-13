# A pure JS polyfill for `details` tag with DOM API for all browsers including IE6+

__Status__: Beta 2

__Demo__: http://jsbin.com/eyopiy/5

## Using

```html
<!--[if lt IE 8]>
<script src=Element.details.ielt8.js"></script>
<![endif]-->
<!--[if IE 8]>
<script src="Element.details.ie8.js"></script>
<![endif]-->
<!--[if gt IE 8]><!-->
<script src="Element.details.js"></script>
<!--<![endif]-->
```

## DOM API
    
```javascript
var details = document.querySelector("details");
details.open = true;
details.open = false;
```

## CSS selector for 'details marker'
   
```css
detail .details-marker { <some> }
[or] detail>*>.details-marker { <some> }

summary::-webkit-details-marker { <some> }
summary::-moz-details-marker { <some> }
summary::-o-details-marker { <some> }
summary::details-marker { <some> }
```

##Use with dynamic HTML
DOM API:
	
```javascript
Array.from(document.querySelectorAll('details')).forEach(function(el){
	el.open = el.open
})
```

jQuery:
	
```javascript
$("details").each(function(k, el) {
	el.open = el.open;
})
```
	
##Features

- DOM API (Extend Node.prototype with "open" property)
- No libs need (almost)
- Create <x-s> element (instead of fake <summary> which can be styled in css) when <details> without <summary>
- Wrap text nodes into custom element <x-i> instead of <span> (which can be styled in css)
- IE6 and IE7 support with some tweaks

##Limitations
1. Require: 
	- For some old browsers (not only IE) you may need [DOM-shim](https://github.com/Raynos/DOM-shim) or [DOM4/ES5 shim](https://github.com/termi/ES5-DOM-SHIM) to solve some dependencies
2. No animation support for now

 
## Browser support
 - All browsers including IE8
 - IE7,IE6 only support with `Element.details.ielt8.htc` file in the root of youre site

## IE < 8
 - Problem: Property `open` has the same name as Attribute `open` -> rename attribute to "$OPEN$"

## TODO
1. Listeners (open/close)