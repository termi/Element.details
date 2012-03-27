# A pure JS polyfill for `details` tag with DOM API for all browsers including IE6+

__Status__: Beta (IMPORTANT)IE6 and IE7 support is not finished yet due IE < 8 broken `getAttribute`
__Demo__: http://jsbin.com/eyopiy/2

## DOM API
    
	var details = document.querySelector("details");
    details.open = true;
    details.open = false;

## CSS selector for 'details marker'
   
    detail .details-marker { <some> }
	[or] detail>*>.details-marker { <some> }
	
    summary::-webkit-details-marker { <some> }
    summary::-moz-details-marker { <some> }
    summary::-o-details-marker { <some> }
    summary::details-marker { <some> }

##Use with dynamic HTML
jQuery:
	
	$("details").each(function(k, el) {
		el.open = el.open;
	})

DOM API:
	
	Array.from(document.querySelectorAll('details')).forEach(function(el){
		el.open = el.open
	})
	
##Features

- DOM API (Extend Node.prototype with "open" property)
- No libs need (almost)
- Create <x-s> element (instead of fake <summary> which can be styled in css) when <details> without <summary>
- Wrap text nodes into custom element <x-i> instead of <span> (which can be styled in css)
- IE6 and IE7 support with some tweaks

##Limitations
1. Require: 
	- [Array.from](https://github.com/paulmillr/es6-shim)
	- [EcmaScript5 shim](https://github.com/kriskowal/es5-shim) for browsers without ES5
	- For some old browsers (not only IE) you may need [DOM-shim](https://github.com/Raynos/DOM-shim)
	- Note: You can use only my [DOM/JS shim](https://github.com/termi/ES5-DOM-SHIM) to solve all dependencies with IE6+ support
2. No animation support for now

 
## Browser support
 - With any DOM and JS shim: all browsers (including IE9+)
 - IE6,IE7,IE8 only with this [DOM/JS shim](https://github.com/termi/ES5-DOM-SHIM) and with `Element.details.ielt8.htc` file in the root of youre site

## IE < 9
Problem: Property `open` has the same name as Attribute `open`.
Old IE has incorrect implementation of the [get/set/has/remove]Attribute, so it need to be shimed. You can fork this lib and try to solve this problem or you can just use my [DOM/JS shim](https://github.com/termi/ES5-DOM-SHIM)

## TODO
1. Listeners (open/close)
2. "root" in init() support