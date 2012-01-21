;(function(global, $$, $A, support, isIElt8Support) {
	var /**
		 * @const
		 * @type {string}
		 */
		__OPEN_WORD__ = "open",
		/**
		 * @const
		 * @type {string}
		 */
		__CLOSE_WORD__ = "close";
	
	var root;//TODO
	
	if(!support) {
		
		// ------------------------- open Property START ----------------------------------
		// IE < 8 support in [IElt8] section and Element.details.ielt8.htc
		var nodeProto = global["HTMLElement"] && global["HTMLElement"].prototype || 
		   /*ie8*/global["Element"] && global["Element"].prototype || 
		   /*ielt8*/(global["_ielt8_Detail_Element_4d1am"] = {});
		
		
		Object.defineProperty(nodeProto, __OPEN_WORD__, {
			"get" : function() {
				if(this.nodeName != "DETAILS")return undefined;
				
				return this.getAttribute(__OPEN_WORD__) != null;//hasAttribute
			},
			"set" : function(booleanValue) {
				if(this.nodeName != "DETAILS")return undefined;
				
				booleanValue ?
					(this.setAttribute(__OPEN_WORD__, __OPEN_WORD__), this.classList.remove(__CLOSE_WORD__), this.classList.add(__OPEN_WORD__)) :
					(this.removeAttribute(__OPEN_WORD__), this.classList.remove(__OPEN_WORD__), this.classList.add(__CLOSE_WORD__));
				
				//$A(this.childNodes).forEach(emulateDetailChildrenOpenClose);
				
				return booleanValue;
			},
			"ielt8" : isIElt8Support//[IElt8]
		});
		// ------------------------- open Property END ----------------------------------
		
		/*TODO START: use normal createStyle function*/
		var style = document.createElement("style"),
			rules = [];
		
		rules[0] = document.createTextNode('details{display:block}');
		rules[1] = document.createTextNode('details.close>*{display:none}');
		rules[2] = document.createTextNode('details>summary,details.close>summary{display:block}');
		rules[3] = document.createTextNode('details>summary::before{content:"►"}');//TODO:: replase summary::before to summary>.details-marker
		rules[4] = document.createTextNode('details.open>summary::before{content:"▼"}');//TODO:: replase summary::before to summary>.details-marker
		style.type = 'text/css';
		if(style.styleSheet)
			style.styleSheet.cssText = rules[0].nodeValue + ";" + rules[1].nodeValue + ";" + rules[2].nodeValue + ";" + rules[3].nodeValue + ";" + rules[4].nodeValue;
		else {
			style.appendChild(rules[0]);
			style.appendChild(rules[1]);
			style.appendChild(rules[2]);
			style.appendChild(rules[3]);
			style.appendChild(rules[4]);
		}
		document.head.appendChild(style);
		/*TODO END*/
		
	
		function event_DetailClick() {
			this.parentNode[__OPEN_WORD__] = !this.parentNode[__OPEN_WORD__];
		}
		
		function init() {
			$A($$("details"), root).forEach(function(detail) {
				detail[__OPEN_WORD__] = detail.hasAttribute(__OPEN_WORD__);
				
				$A(detail.childNodes).forEach(function(child) {
					if(child.nodeType === 3 && /[^\t\n\r ]/.test(child.data)) {
						var a = detail.insertBefore(
							document.createElement("x-i")//Create a fake inline element
							, child);
						a.innerHTML = child.data;
						a.style.display = "inline";
						detail.removeChild(child);
					}
				})
				
				var summary = $$(">summary", detail)[0];
				if(!summary)
					(summary = 
						detail.insertBefore(document.createElement("x-summary"), detail.children[0])//Create a fake "summary" element
						).innerText = "Details",
					summary.style.display = "block";
				
				summary.setAttribute("tabindex", 0);//For access from keyboard
				
				summary.addEventListener("click", event_DetailClick, false);
				
				//[IElt8] START
				if(global["_ielt8_Detail_Element_4d1am"] && isIElt8Support)detail["addBehavior"]("Element.details.ielt8.htc");
				//[IElt8] END
			})
		}
		
		if(document.readyState != "complete")
			global.addEventListener("DOMContentLoaded", init, false);
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
	
	true//Try to support IE < 8
);

