qr-image
=========

This is yet another QR Code generator.

Overview
--------

  * No dependecies;
  * both async and synchronous modes available;
  * generate image in `png`, `svg`, `eps` and `pdf` formats;
  * numeric and alphanumeric modes;
  * supports UTF-8.

[Releases](https://github.com/flatr0ze/qr-image/releases/)

Usage
-----

Example:
```
var qr = require('qr-image');

var qr_svg = qr.image('I love QR!', { type: 'svg' });
qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
```

[More examples](./examples)

`qr = require('qr-image')`

`qr.image(text, [ec_level | options])` — returns Readable stream with image data.
`qr.matrix(text, [ec_level])` — returns 2D array.

  * `text` — text to encode;
  * `ec_level` — error correction level. One of `L`, `M`, `Q`, `H`. Default `M`.
  * `options` — image options object:
    * `ec_level` — default `M`.
    * `type` — image type. Possible values `png` (default), `svg`, `pdf` and `eps`.
    * `size` (only png) — size of one module in pixels. Default `5`.
    * `margin` (only png) — white space around QR image in modules. Default `4`.
    * `customize` (only png) — function to customize qr bitmap before encoding to PNG.

TODO
----

  * Tests;
  * mixing modes;
  * Kanji (???).
