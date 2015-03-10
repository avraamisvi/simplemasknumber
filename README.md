## A simple input mask for decimal numbers

  A was tired of trying to find some *SIMPLE* input mask for the systems that I develop.
  So I decided to make my own input mask.

  The idea here is to be simple, so do not expect a lot of configuration options.
  The input will receive numbers from right to left, starting from the decimal.

  **this version is early ALPHA.**

##Usage:

    $simpleNumberMask.apply(".simple-input", {decimal: {size:2, separator:","}, integer: {size:6, separator:"."} });

    will produce: 111.111,00

    //or

    $simpleNumberMask.apply(".simple-input");

    will produce: 111,111.00

    //...

###For more usage examples look in the *index.html* file.

##Installation

      bower install simple-number-mask
