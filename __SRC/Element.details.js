// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @warning_level VERBOSE
// @jscomp_warning missingProperties
// @output_file_name Element.detail.js
// @check_types
// ==/ClosureCompiler==

;(function(global, support, isIElt8Support) {
	if(!support) {
		// property 'open'
		// IE < 9 support in https://github.com/termi1uc1/ES5-DOM-SHIM
		Object.defineProperty(
			global["Node"].prototype,
			"open", {
				"get" : function() {
					if(this.nodeName != "DETAILS")return undefined;
					
					return this.hasAttribute("open");
				},
				"set" : function(booleanValue) {
					if(this.nodeName != "DETAILS")return undefined;
					
					booleanValue ?
						(this.setAttribute("open", "open"), this.classList.remove("close"), this.classList.add("open")) :
						(this.removeAttribute("open"), this.classList.remove("open"), this.classList.add("close"));
					
					//$A(this.childNodes).forEach(emulateDetailChildrenOpenClose);
					
					return booleanValue;
				}
			}
		);
		
		//style
		(function createStyleSheet(rules) {
			var style = document.createElement('style');
			// Safari does not see the new stylesheet unless you append something.
			// However!  IE will blow chunks, so ... filter it thusly:
			if(!global["createPopup"])style.appendChild(document.createTextNode(''));
			
			document.head.appendChild(style);
			var s = document.styleSheets[document.styleSheets.length - 1];

			// loop through and insert
			for(selector in rules) {
				if(s.insertRule)// it's an IE browser
					s.insertRule(selector + rules[selector], s.cssRules.length); 
				else // it's a W3C browser
					s.addRule(selector, rules[selector]);
			}
			
		})({
			"details" : "{display:block}",
			"details.close>*" : "{display:none}",
			"details>summary,details.close>summary,details>x-s" : "{display:block}",
			"details>summary::before" : "{content:'►'}",//TODO:: replase summary::before to summary>.details-marker
			"details.open>summary::before" : "{content:'▼'}"//TODO:: replase summary::before to summary>.details-marker
			})	
	
		//event		
		function event_DetailClick(e) {
			if(e.type === "click" && e.detail === 0)return;//Opera generate "click" event
			
			// 32 - space. Need this ???
			// 13 - Enter. Opera triggers .click()
			
			if(e.keyCode === 13 //e.type == "keyup"
			   )
				this.parentNode["open"] = !this.parentNode["open"];
		}
		
		//detail shim
		function detailShim(detail) {
			var /**
				 * @type {Element}
				 */
				summary,
				/**
				 * Temporary container
				 * @type {Element}
				 */
				_s,
				/**
				 * @type {number}
				 */
				i = 0;
			
			//DOM API
			detail["open"] = 
				detail.hasAttribute("open");
			
			//Wrap text node's
			function wrapTextNode(child) {
				if(child.nodeType === 3 && /[^\t\n\r ]/.test(child.data)) {
					detail.insertBefore(
						document.createElement("x-i")//Create a fake inline element
						, child).innerHTML = child.data;

					detail.removeChild(child);
				}
			}
			Array["from"](detail.childNodes).forEach(wrapTextNode);
			
			//Instead of $$(">summary")[0]
			while(!summary)
				_s = detail.childNodes[i++],
				_s.tagName == "SUMMARY" ? summary = _s : 0;
			
			//Create a fake "summary" element
			if(!summary)
				(
					summary = document.createElement("x-s")
				).innerHTML = "Details";
				
			//Put summary as a first child
			detail.insertBefore(summary, detail.children[0]);
			
			//For access from keyboard
			summary.setAttribute("tabindex", 0);
			
			//events
			summary.addEventListener("click", event_DetailClick, false);
			summary.addEventListener("keyup", event_DetailClick, false);
			
			//[IElt8]
			//IE < 8 support
			//Algoritm in https://github.com/termi1uc1/ES5-DOM-SHIM/wiki/IE-less-then-8-shim-algoritm
			if(isIElt8Support && global["Node"].prototype["ielt8"])detail["addBehavior"]("Element.details.ielt8.htc");
		}
		
		//init
		function init(root) {
			Array["from"](document.getElementsByTagName("details")).forEach(detailShim)
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

