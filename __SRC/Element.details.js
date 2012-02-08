// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name Element.details.js
// @check_types
// ==/ClosureCompiler==

;(function(global, support, isIElt8Support) {
	if(!support) {
		// property 'open'
		var open_property = {
			"get" : function() {
				if(this.nodeName.toUpperCase() != "DETAILS")return undefined;
				
				return this.hasAttribute("open");
			},
			"set" : function(booleanValue) {
				if(this.nodeName.toUpperCase() != "DETAILS")return undefined;
				
				booleanValue ?
					(this.setAttribute("open", "open"), this.classList.remove("close"), this.classList.add("open")) :
					(this.removeAttribute("open"), this.classList.remove("open"), this.classList.add("close"));
				
				//$A(this.childNodes).forEach(emulateDetailChildrenOpenClose);
				
				return booleanValue;
			}
		}
		
		//style
		var rules = 
				"details{display:block}\n" +
				"details.close>*{display:none}\n" +
				"details>summary,details.close>summary,details>.▼{display:block}\n" +
				"details .details-marker:before{content:'►'}\n" +
				"details.open .details-marker:before{content:'▼'}",
			style = document.createElement('style'),
			key = style.textContent !== undefined ? 'textContent' : 'innerText';
		
		try {
			style[key] = rules;
		}
		catch(e) {//IE < 9
			style = document.createElement("x-i");
			style.innerHTML = "<br><style>" + rules + "</style>";
		}
		document.head.appendChild(style);
	
		//event		
		function event_DetailClick(e) {
			if(e.type === "click" && e.detail === 0)return;//Opera generate "click" event with `detail` == 0 together with "keyup" event
			
			// 32 - space. Need this ???
			// 13 - Enter.
			
			if(e.keyCode === 13 ||//e.type == "keyup"
			   e.type === "click")
				this.parentNode["open"] = !this.parentNode["open"];
		}
		
		//detail shim
		function detailShim(detail) {
			if(detail.isShimmed)return;
			
			// property 'open'
			// IE < 9 support in https://github.com/termi/ES5-DOM-SHIM
			Object.defineProperty(detail, "open", open_property);
			
			var /** @type {Element} */
				summary,
				/** @type {number} */
				i = 0;
			
			//DOM API
			detail["open"] = 
				detail.hasAttribute("open");
			
			//Wrap text node's and found `summary`
			function wrapTextNodeAndFoundSummary(child) {
				if(child.nodeType === 3 && /[^\t\n\r ]/.test(child.data)) {
					detail.insertBefore(
						document.createElement("x-i")//Create a fake inline element
						, child).innerHTML = child.data;

					detail.removeChild(child);
				}
				else if(child.nodeName.toUpperCase() == "SUMMARY")summary = child;
			}
			Array["from"](detail.childNodes).forEach(wrapTextNodeAndFoundSummary);
			
			//Create a fake "summary" element
			if(!summary)
				(
					summary = document.createElement("x-s")
				).innerHTML = "Details",
				summary.className = "▼";//http://css-tricks.com/unicode-class-names/
				
			//Put summary as a first child
			detail.insertBefore(summary, detail.childNodes[0]);
			//Create `details-marker` and put it as a summary first child
			summary.insertBefore(document.createElement('x-i'), summary.childNodes[0])
				.className = "details-marker";
			
			//For access from keyboard
			summary.tabIndex = 0;
			
			//events
			summary.addEventListener("click", event_DetailClick, false);
			summary.addEventListener("keyup", event_DetailClick, false);
			
			//flag to avoid double shim
			detail.isShimmed = 1;
			
			//[IElt8]
			//IE < 8 support
			//Algoritm in https://github.com/termi/ES5-DOM-SHIM/wiki/IE-less-then-8-shim-algoritm
			if(isIElt8Support && global["Node"].prototype["ielt8"]) {
				detail["addBehavior"]("Element.details.ielt8.htc");
			}
		}
		
		//init
		function init(root) {
			//[IElt8]
			//IE < 8 support
			//Algoritm in https://github.com/termi/ES5-DOM-SHIM/wiki/IE-less-then-8-shim-algoritm
			if(isIElt8Support && global["Node"].prototype["ielt8"] && !("getopen" in global["Node"].prototype)) {
				Object.defineProperty(global["Node"].prototype, "open", open_property);
			}
			//[IElt8] End
			
			Array["from"](document.getElementsByTagName("details")).forEach(detailShim);
		}
		
		//auto init
		if(document.readyState != "complete")
			global.addEventListener("DOMContentLoaded", init.bind(null, document), false);
		else init(document);
	}
	else {
		//TODO:: for animation and over stuffs we need to listen "open" property change and add "open" css class for Detail element
	}
})(
	window,//global
	
	'open' in document.createElement('details'),// Chrome 10 will fail this detection, but Chrome 10 is no longer existing
	
	true//[IElt8] Try to support IE < 8
);

