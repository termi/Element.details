# A pure JS polyfill for <details> tag with DOM API for all browsers including IE6+

__Status__: (IMPORTANT)IE6 and IE7 support is not finished yet

## DOM API:
    
	var details = document.querySelector("details");
    details.open = true;
    details.open = false;

## CSS selector for 'details marker':
   
   summary .details-marker,/* <-- */
   summary::-webkit-details-marker
   [,summary::-moz-details-marker]
   [,summary::-o-details-marker]
   ,summary::details-marker { <some> }

##Features:

- Extend HTMLElement.prototype with "open" property
- No libs need (almost)
- DOM API
- Create <x-s> element (instead of fake <summary> which can be styled in css) when <details> without <summary>
- Wrap text nodes into custom element <x-i> instead of <span> (which can be styled in css)
- IE6 and IE7 support with some tweaks

##Limitations:
 1 Require: [Array.from](https://github.com/paulmillr/es6-shim)
 2 No animation support for now

 
## Browser support:
 - With any DOM and JS shim: all browsers (including IE8+)
 - IE6+ only with this [DOM/JS shim](https://github.com/termi1uc1/ES5-DOM-SHIM) and with `Element.details.ielt8.htc` file in the root of youre site

## TODO:
1. Listeners (open/close)
2. Custom <x-i> element with "details-marker" class instead of "details>summary::before" for details marker purpose
3. Code refactoring/minimising
4. "root" in init() support
5. External API for init() function