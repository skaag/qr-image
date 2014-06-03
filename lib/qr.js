"use strict";

var Readable = require('stream').Readable;

var QR = require('./qr-base').QR;
var png = require('./png');
var vector = require('./vector');
var pngSync = require('./png-sync');
var vectorSync = require('./vector-sync');

var fn_noop = function() {};

var DEFAULT_OPTIONS = {
    ec_level: 'M',
    type: 'png',
    size: 5,
    margin: 4,
    customize: null,
}

function qr_image(text, options) {
    if (typeof options === 'string')
        options = { 'ec_level': options }
    else
        options = options || {};

    var _options = {};
    for (var k in DEFAULT_OPTIONS)
        _options[k] = options[k] || DEFAULT_OPTIONS[k];
    _options.type = ('' + _options.type).toLowerCase();

    var matrix = QR(text, _options.ec_level);
    var stream = new Readable();
    stream._read = fn_noop;

    switch (_options.type) {
    case 'svg':
    case 'pdf':
    case 'eps':
        process.nextTick(function() {
            vector[_options.type](matrix, stream);
        });
        break;
    case 'png':
    default:
        process.nextTick(function() {
            var bitmap = png.bitmap(matrix, _options.size, _options.margin);
            if (_options.customize)
                _options.customize(bitmap);
            png.PNG(bitmap, stream);
        });
    }

    return stream;
}

function qr_image_sync(text, options) {
    if (typeof options === 'string')
        options = { 'ec_level': options }
    else
        options = options || {};

    var _options = {};
    for (var k in DEFAULT_OPTIONS)
        _options[k] = options[k] || DEFAULT_OPTIONS[k];
    _options.type = ('' + _options.type).toLowerCase();

    var matrix = QR(text, _options.ec_level);

    switch (_options.type) {
    case 'svg':
    case 'pdf':
    case 'eps':
        return vectorSync[_options.type](matrix);
        break;
    case 'png':
    default:
        var bitmap = png.bitmap(matrix, _options.size, _options.margin);
        if (_options.customize)
            _options.customize(bitmap);
        return pngSync.PNG(bitmap);
    }
}

module.exports = {
    matrix: QR,
    image: qr_image,
    imageSync: qr_image_sync
};
