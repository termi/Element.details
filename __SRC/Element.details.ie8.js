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
			"details.close>*{display:none}" +
			"details summary,details.close>summary,details .▼{display:block}" +
			"details.close .details-marker:before{content:'►'}" +
			"details .details-marker:before{content:'▼'}" +
		"</style>");

		var _Element = global["Element"] || (global["Element"] = {}),
			_Element_prototype = (_Element.prototype || (_Element.prototype = {})),
			addCssClass = function(node, klas) {
                var re = new RegExp("(^|\\s)" + klas + "(\\s|$)", "g");
                if(re.test(node.className))return node;
                node.className = (node.className + " " + klas).replace(/\s+/g, " ").replace(/(^ | $)/g, "");
            },
            removeCssClass = function(node, klas) {
                var re = new RegExp("(^|\\s)" + klas + "(\\s|$)", "g");
                node.className = node.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "");
            };

		// property 'open'
		var open_property = {
			"get" : function() {
				if(this.nodeName.toUpperCase() != "DETAILS")return void 0;
				
				return this.getAttribute("OPEN") !== null;
			},
			"set" : function(booleanValue) {
				if(this.nodeName.toUpperCase() != "DETAILS")return void 0;

				booleanValue = detailsShim(this, booleanValue);
				
				booleanValue ?
					(removeCssClass(this, "close"), addCssClass(this, "open"), this.setAttribute("OPEN", "")) :
					(removeCssClass(this, "open"), addCssClass(this, "close"), this.removeAttribute("OPEN"));
				
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
				summary.className = "▼";//http://css-tricks.com/unicode-class-names/
			
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
			};
			summary.attachEvent("onclick", eventWrapper);
			summary.attachEvent("onkeyup", eventWrapper);
			
			//flag to avoid double shim
			details._["__isShimmed"] = 1;
			
			prevValue = "open" in details.attributes;

			//For IE8 Object.defineProperty(Node.prototype, "open", {get : getter, set : setter}) is not enoth. setter not work
			Object.defineProperty(details, "open", open_property);
			
			details.removeAttribute("open");
			if(prevValue)details.setAttribute("OPEN", "");

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
			};
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

