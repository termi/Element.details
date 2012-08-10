// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name Element.details.ie8.js
// @check_types
// ==/ClosureCompiler==

;(function(global, _browser_msie) {
	_browser_msie = !!(_browser_msie && +_browser_msie[1]);
	
	if(_browser_msie) {
		//style
		document.head.insertAdjacentHTML("beforeend", "<br><style>" +//<br> need for all IE
			"details{display:block}" +
			"details.►>*{display:none}" +
			"details summary,details.►>summary,details>.▼▼{display:block}" +
			"details.► .details-marker:before{content:'►'}" +
			"details .details-marker:before{content:'▼'}" +
		"</style>");

		var _Element = global["Element"] || (global["Element"] = {}),
			_Element_prototype = (_Element.prototype || (_Element.prototype = {})),
			addOrRemoveCssClass = function(add, node, klas) {
                var re = new RegExp("(^|\\s)" + klas + "(\\s|$)", "g"),
                	ka = node.className;

                if(add) {
	                if(re.test(ka))return node;
	                ka = (ka + " " + klas);
                }
                else 
                	ka = ka.replace(re, "$1");

                node.className = ka.replace(/\s+/g, " ").replace(/(^ | $)/g, "");
            },
            _openAttributeReplacement = "OPEN";

		// property 'open'
		var open_property = {
			"get" : function() {
				if(!("nodeName" in this) || this.nodeName.toUpperCase() != "DETAILS")return void 0;
				
				return this.getAttribute(_openAttributeReplacement) !== null;
			},
			"set" : function(booleanValue) {
				if(!("nodeName" in this) || this.nodeName.toUpperCase() != "DETAILS")return void 0;

				booleanValue = detailsShim(this, booleanValue);
				
				addOrRemoveCssClass(!booleanValue, this, "►");
				booleanValue ?
					this.setAttribute(_openAttributeReplacement, "", 1) :
					this.removeAttribute(_openAttributeReplacement, 1)
				
				//Array["from"](this.childNodes).forEach(emulateDetailChildrenOpenClose);
				
				return booleanValue;
			}
		};
	
		//event		
		function event_DetailClick(e) {
			// 32 - space. Need this ???
			// 13 - Enter.
			
			if(e.keyCode === 13 ||//e.type == "keyup"
			   e.type === "click")
				this.parentNode["open"] = !this.parentNode["open"];
		}
		
		//details shim
		function detailsShim(details, prevValue) {
			if(details._ && details._["__isShimmed"])return prevValue;
			
			if(!details._)details._ = {};
			
			var /** @type {Element} */
				summary,
				/** @type {number} */
				i = 0,
				child,
				j = -1;
						
			//Wrap text node's and found `summary`
			while(child = details.childNodes[++j]) {
				if(child.nodeType === 3 && /[^\t\n\r ]/.test(child.data)) {
					details.insertBefore(
						document.createElement("x-i")//Create a fake inline element
						, child).innerHTML = child.data;

					details.removeChild(child);
				}
				else if(child.nodeName.toUpperCase() == "SUMMARY")summary = child;
			}

			//Create a fake "summary" element
			if(!summary)
				(
					summary = document.createElement("x-s")
				).innerHTML = "Details",
				summary.className = "▼▼";//http://css-tricks.com/unicode-class-names/
			
			//Put summary as a first child
			details.insertBefore(summary, details.childNodes[0]);
			//Create `details-marker` and put it as a summary first child
			summary.insertBefore(document.createElement('x-i'), summary.childNodes[0])
				.className = "details-marker";
			
			//For access from keyboard
			summary.tabIndex = 0;

			//events
			function eventWrapper() {
				event_DetailClick.call(summary, event)
			}
			summary.attachEvent("onclick", eventWrapper);
			summary.attachEvent("onkeyup", eventWrapper);
			
			//flag to avoid double shim
			details._["__isShimmed"] = 1;
			
			prevValue = "open" in details.attributes;

			//For IE8 Object.defineProperty(Node.prototype, "open", {get : getter, set : setter}) is not enoth. setter not work
			Object.defineProperty(details, "open", open_property);
			
			if(prevValue) {
				details.removeAttribute("open");
				details.setAttribute(_openAttributeReplacement, "", 1);
			}

			return prevValue;
		}
		
		//init
		function init() {
			// property 'open'
			Object.defineProperty(_Element_prototype, "open", open_property);
			
			var detailses = document.getElementsByTagName("details"),
				details,
				i = -1;
			while(details = detailses[++i]) {
				//DOM API
				details["open"] = 
					details.getAttribute("open") !== null;
			}
		}
		
		//auto init
		if(document.readyState != "complete") {
			if(document.readyState === void 0)init();

			if(document.addEventListener)document.addEventListener("DOMContentLoaded", init);
			else window.attachEvent("onload", init);
		}
		else init();
	}
})(
	window,//global
	
	/msie (\d+)/i.exec(navigator.userAgent)
);

