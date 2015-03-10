var $simpleNumberMask = (function(){

  var inst;

  function init() {

    /*
      Format configuration:

        # - not fixed digit.
        0 - fixed digit, start always with zero.
        . - decimal separator.
        , - thousands separator.

        usage example:

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
      item["@simple-number-mask-value"] = "";

      item.onkeyup = function(self){
        return function(event){

          if(event.keyCode > 57 || event.keyCode < 48) {
            if(event.keyCode==8) {
              var orn = self["@simple-number-mask-value"];
              orn = orn.substring(1);
              self["@simple-number-mask-value"] = orn;
            } else {
              return;
            }

          }

          var conf = self["@simple-number-mask"];
          var origin = self["@simple-number-mask-value"];

          if(origin.length >= (self.maxlength - 2)) {
            return;
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
            origintmp += "0";// I'm representating the number in reverse order like 00.000,1
          }

          //decimal
          for(var id = 0; id < config.decimal.size; id++) {
            output = origintmp.charAt(id) + output;
          }

          output = config.decimal.separator + output;

          origintmp.trim();
          //integer
          for(var id = 2; id < origintmp.length; id++) {

            if(integr == 3) {
              output = config.integer.separator + output;
              integr=0;
            }
            integr++;

            output = origintmp.charAt(id) + output;
          }

          item.value = output;

          return false;
        }//end function
      }(item);

      item.onkeydown = function(ev){
        return false;
      }

    }

    function applyMask() {

    }

    return {

      //Apply the mask to a field by selector
      apply: function(selector, config) {
        elems = document.querySelectorAll(selector);

        for (var id = 0; id < elems.length; id++) {
          configure(elems[id]);
        }
      }

    }
  }

  return init();
})();
