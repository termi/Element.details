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
	[or] detail>x-s>.details-marker { <some> }
	
    summary::-webkit-details-marker { <some> }
    summary::-moz-details-marker { <some> }
    summary::-o-details-marker { <some> }
    summary::details-marker { <some> }

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
2. No animation support for now

 
## Browser support
 - With any DOM and JS shim: all browsers (including IE8+)
 - IE6+ only with this [DOM/JS shim](https://github.com/termi/ES5-DOM-SHIM) and with `Element.details.ielt8.htc` file in the root of youre site

## TODO
1. Listeners (open/close)
2. "root" in init() support
3. External API for init() function