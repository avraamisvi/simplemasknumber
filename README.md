## A simple input mask for decimal numbers

  I was tired of trying to find some *SIMPLE* input mask for the systems I develop.
  So I decided to make my own input mask.

  The idea here is to be simple, so do not expect a lot of configuration options.
  The input will receive numbers from right to left, starting from the decimal.

  **This is an ALPHA version.**


##Features

  - content can be copied with ctrl+c.
  - returns value as number.
  - returns value as unmasked string.
  - **SIMPLE** to understand.

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
