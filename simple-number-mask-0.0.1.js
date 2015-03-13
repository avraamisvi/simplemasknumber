/*
	A simple input mask with basic features to mask a input field for number values.
	
	github: https://github.com/avraamisvi/simplemasknumber
	Author: Abraao Isvi.
	Date: 05-10-2015
	license: MIT
*/
var $simpleNumberMask = (function(){

	function init() {

	function formatValue(item, config) {
	
	      var origin = origin = item.value.replace(/\D/gi,"");
	      var output = "";
	      
	      if(!origin) {
	    	  origin = "";
	      }
	
	      item["@simple-number-mask-value"] = origin;
	
	      var origintmp = origin;
	      var integr = 0;
	
	      var origintmp = origin;
	        var integr = 0;

        while(origintmp.length < (config.decimal.size + 1)) {
          origintmp = "0" + origintmp;
        }

        //integer
        for(var id = (origintmp.length - config.decimal.size)-1; id >= 0; id--) {

          if(integr == 3) {
            output = config.integer.separator + output;
            integr=0;
          }
          integr++;

          output = origintmp.charAt(id) + output;
        }

        output = output + config.decimal.separator;

        //decimal
        for(var id = (origintmp.length - config.decimal.size); id < origintmp.length; id++) {
          output += origintmp.charAt(id);
        }

        origintmp.trim();

        item.value = output;

        item.setSelectionRange(item.value.length,item.value.length);
	}
	  
    /*
      Format configuration:
      Usage example:

          configure(itm, {decimal: {size:2, separator:","}, integer: {size:6, separator:"."} })

          will produce a number like 100.000,00

    */
	 function configure(item, config) {

	      if(!config) {
	        config = {decimal: {size:2, separator:"."}, integer: {size:6, separator:","} };
	      }

	      item.style["text-align"] = "right";
	      item["@simple-number-mask"] = config;
	      item.maxlength = config.decimal.size + config.integer.size + 2;
	      //item["@simple-number-mask-value"] = "";

	      function processKey(self, event) {

	        if(event.keyCode == 67 && event.ctrlKey) {
	          return true;
	        }

	        if(event.keyCode > 57 || event.keyCode < 48) {
	          if(event.keyCode==8) {
	            var orn = self["@simple-number-mask-value"];
	            orn = orn.substring(0, orn.length-1);
	            self["@simple-number-mask-value"] = orn;
	          } else {
	            return false;
	          }

	        }

	        var conf = self["@simple-number-mask"];
	        var origin = self["@simple-number-mask-value"];

	        if(origin.length >= (self.maxlength - 2)) {
	          return false;
	        }

	        var output = "";

	        if(event.keyCode != 8) {
	          var ch = String.fromCharCode(event.keyCode);
	          origin += ch;
	        }

	        self["@simple-number-mask-value"] = origin;

	        var origintmp = origin;
	        var integr = 0;

	        while(origintmp.length < (conf.decimal.size + 1)) {
	          origintmp = "0" + origintmp;
	        }

	        //integer
	        for(var id = (origintmp.length - config.decimal.size)-1; id >= 0; id--) {

	          if(integr == 3) {
	            output = config.integer.separator + output;
	            integr=0;
	          }
	          integr++;

	          output = origintmp.charAt(id) + output;
	        }

	        output = output + config.decimal.separator;

	        //decimal
	        for(var id = (origintmp.length - config.decimal.size); id < origintmp.length; id++) {
	          output += origintmp.charAt(id);
	        }

	        origintmp.trim();

	        item.value = output;

	        item.setSelectionRange(item.value.length,item.value.length);

	        return false;
	  }

      item.onkeyup = function(event){
        this.setSelectionRange(this.value.length,this.value.length);
        return false;
      }

      item.onkeydown = function(self){
        return function(event){
          this.setSelectionRange(this.value.length,this.value.length);
          return processKey(self, event);
        }
      }(item);

      item.onfocus = function (ev) {
        this.setSelectionRange(this.value.length,this.value.length);
        return false;
      }

      item.ondragend = function (ev) {
        this.setSelectionRange(this.value.length,this.value.length);
        return false;
      }


      item.onclick = function (ev) {
        this.setSelectionRange(this.value.length,this.value.length);
        return false;
      }

      item.onselect = function (ev) {
        this.setSelectionRange(this.value.length,this.value.length);
        return false;
      }

      item.oncopy = function (ev) {
        this.setSelectionRange(0,this.value.length);
        return true;
      }
    }

    return {

      getValue: function (elementId) {
        var elem = document.getElementById(elementId);

        if(elem) {
            return elem["@simple-number-mask-value"];
        }

        return null;
      },

      getNumber: function (elementId) {
        var elem = document.getElementById(elementId);

        if(elem) {
            val = elem["@simple-number-mask-value"];
            val = parseInt(val);
            exp = parseInt(elem["@simple-number-mask"].decimal.size);
            return val/Math.pow(10, exp);
        }

        return null;
      },

      //Apply the mask to a field by selector
      apply: function(selector, config) {
        elems = document.querySelectorAll(selector);

        for (var id = 0; id < elems.length; id++) {
          formatValue(elems[id], config);
          configure(elems[id], config);
        }
      }

    }
  }

  return init();
})();

