// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name Element.details.ielt8.js
// @check_types
// ==/ClosureCompiler==

var __URL_TO_DETAILS_BEHAVIOR__ = "/Element.details.ielt8.htc";

;(function(global, _browser_msie) {
	_browser_msie = !!(_browser_msie && +_browser_msie[1]);
	
	if(_browser_msie) {
		var isNeedBehavior,
			_Element = global["Element"] || (global["Element"] = {}),
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
            };
            isCssClass = function(node, klas) {
                return !!~(" " + node.className + " ").indexOf(" " + klas + " ")
            },
            emulateDetailChildrenOpenClose = function(details, open) {
            	var i = -1,
            		child,
            		detailsMarker,
            		j;

            	while(child = details.childNodes[++i]) {
            		if(child.nodeType == 1) {
	            		if(child.nodeName.toUpperCase() == "SUMMARY" || isCssClass(child, "▼▼")) {
	            			j = -1;
	            			while(!detailsMarker && (detailsMarker = child.childNodes[++j]) && !isCssClass(detailsMarker, "details-marker")) {
	            				detailsMarker = void 0;
	            			}
	            			if(detailsMarker)detailsMarker.innerHTML = open ? "▼" : "►";
	            		}
	            		else child.style.display = open ? "" : "none";
            		}
            	}
            },
            _openAttributeReplacement = "OPEN";

		// property 'open'
		var open_property = {
			"get" : function() {
				if(!("nodeName" in this) || this.nodeName.toUpperCase() != "DETAILS")return void 0;
				
				return this.getAttribute(_openAttributeReplacement, 1) !== null;
			},
			"set" : function(booleanValue) {
				if(!("nodeName" in this) || this.nodeName.toUpperCase() != "DETAILS")return void 0;

				booleanValue = detailsShim(this, booleanValue);
				
				addOrRemoveCssClass(!booleanValue, this, "►");
				booleanValue ?
					this.setAttribute(_openAttributeReplacement, "", 1) :
					this.removeAttribute(_openAttributeReplacement, 1)
				;
				
				emulateDetailChildrenOpenClose(this, booleanValue);
				
				return booleanValue;
			}
		};

		// property 'open'
		if(Object.defineProperty) {
			Object.defineProperty(_Element_prototype, "open", open_property);//IE8
		}
		if(!("open" in _Element_prototype) && !("getopen" in _Element_prototype)) {//IE7,IE6
			//Algoritm in https://github.com/termi/ES5-DOM-SHIM/wiki/IE-less-then-8-shim-algoritm
			_Element_prototype["getopen"] = open_property["get"];
			_Element_prototype["setopen"] = open_property["set"];
			isNeedBehavior = true;
		}
		if(isNeedBehavior)_openAttributeReplacement = "OPEN";
	
		//style
		document.head.insertAdjacentHTML("beforeend", "<br><style>" +//<br> need for all IE
			"details summary,details .▼▼{display:block}" +
			"details{display:block" + (isNeedBehavior ? ";behavior:url(" + __URL_TO_DETAILS_BEHAVIOR__ + ")}" : "}") +
		"</style>");

		//event		
		function event_DetailClick(e) {
			// 32 - space. Need this ???
			// 13 - Enter.
			
			if(e.keyCode === 13 ||//e.type == "keyup"
			   e.type === "click")
				open_property["set"].call(this.parentNode, !(open_property["get"].call(this.parentNode)));
		}
		
		//details shim
		function detailsShim(details, prevValue) {
			if(details._ && details._["__isShimmed"])return prevValue;
			
			if(!details._)details._ = {};

			if(isNeedBehavior) {
				prevValue = "open" in details.attributes;
			}
			else {
				prevValue = details.getAttribute("open") !== null;
				Object.defineProperty(details, "open", open_property);//IE8
			}
			
			details.removeAttribute("open");
			if(prevValue)details.setAttribute(_openAttributeReplacement, "", 1);
			
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
			
			//if(_browser_msie < 8)_.summary = summary;

			//Put summary as a first child
			details.insertBefore(summary, details.childNodes[0]);
			//Create `details-marker` and put it as a summary first child
			document.createElement('x-i');
			summary.insertAdjacentHTML("afterbegin", '<x-i class=details-marker>' + (prevValue ? "▼" : "►") + '</x-i>');
			
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

			return prevValue;
		}
		
		//init
		function init() {			
			var detailses = document.getElementsByTagName("details"),
				details,
				i = -1;
			while(details = detailses[++i]) {
				open_property["set"].call(details, open_property["get"].call(details));
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

