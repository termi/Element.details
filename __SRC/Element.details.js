;(function(global, $$, $A, support, isIElt8Support) {
	var /**
		 * @const
		 * @type {string}
		 */
		__OPEN_WORD__ = "open";
	
	if(!support) {
		// property 'open'
		// IE < 8 support in [IElt8] section and Element.details.ielt8.htc
		Object.defineProperty(
			global["HTMLElement"] && global["HTMLElement"].prototype || 
				/*ie8*/global["Element"] && global["Element"].prototype || 
				/*ielt8*/(global["_ielt8_Detail_Element_4d1am"] = {}),
			__OPEN_WORD__, {
				"get" : function() {
					if(this.nodeName != "DETAILS")return undefined;
					
					return this.getAttribute(__OPEN_WORD__) != null;//hasAttribute
				},
				"set" : function(booleanValue) {
					if(this.nodeName != "DETAILS")return undefined;
					
					booleanValue ?
						(this.setAttribute(__OPEN_WORD__, __OPEN_WORD__), this.classList.remove("close"), this.classList.add(__OPEN_WORD__)) :
						(this.removeAttribute(__OPEN_WORD__), this.classList.remove(__OPEN_WORD__), this.classList.add("close"));
					
					//$A(this.childNodes).forEach(emulateDetailChildrenOpenClose);
					
					return booleanValue;
				},
				"ielt8" : isIElt8Support//[IElt8]
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
	
		//events
		function event_DetailClick(e) {
			// 32 - space. Need this ???
			// 13 - Enter. Opera triggers .click()
			if(!e.keyCode/*e.type == "click"*/ || e.keyCode == 13/*e.type == "keyup"*/)
				this.parentNode[__OPEN_WORD__] = !this.parentNode[__OPEN_WORD__];
		}
		
		function init(root) {
			$A($$("details"), root).forEach(function(detail) {
				detail[__OPEN_WORD__] = 
					detail.getAttribute(__OPEN_WORD__) != null;//hasAttribute
				
				$A(detail.childNodes).forEach(function(child) {
					if(child.nodeType === 3 && /[^\t\n\r ]/.test(child.data)) {
						detail.insertBefore(
							document.createElement("x-i")//Create a fake inline element
							, child).innerHTML = child.data;
						//a.style.display = "inline";
						detail.removeChild(child);
					}
				})
				
				var summary = $$(">summary", detail)[0];
				if(!summary)(summary = document.createElement("x-s")).innerText = "Details";//Create a fake "summary" element
				detail.insertBefore(summary, detail.children[0]);//Put summary as a first child
				
				summary.setAttribute("tabindex", 0);//For access from keyboard
				
				summary.addEventListener("click", event_DetailClick, false);
				if(!global.opera)// keyCode 13 - Enter. Opera triggers .click()
					summary.addEventListener("keyup", event_DetailClick, false);
				
				//[IElt8] START
				if(global["_ielt8_Detail_Element_4d1am"] && isIElt8Support)detail["addBehavior"]("Element.details.ielt8.htc");
				//[IElt8] END
			})
		}
		
		if(document.readyState != "complete")
			global.addEventListener("DOMContentLoaded", init.bind(null, null), false);
		else init();
	}
	else {
		//TODO:: for animation and over stuffs we need to listen "open" property change and add "open" css class for Detail element
	}
})(
	window,//global
	/**
	 * Youre own function(){return toArray(root.querySelectorAll(#selector#))} function
	 * @param {string} selector
	 * @param {Node|Document|DocumentFragment} root
	 * @return {Array.<Node>}
	 */
	function(selector, root) {root = root || document;return window["$$"] ? window["$$"](selector, root) : Array.prototype.slice.apply(root.querySelectorAll(selector))},
	/**
	 * Youre own toArray function
	 * @param {Object} iterable value
	 * @return {Array}
	 */
	function(iterable) {return window["$A"] ? window["$A"](iterable) : Array.prototype.slice.apply(iterable)},
	
	'open' in document.createElement('details'),// Chrome 10 will fail this detection, but Chrome 10 is no longer existing
	
	true//[IElt8] Try to support IE < 8
);

