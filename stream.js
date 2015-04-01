var duplexer = require('duplexer2')
var through = require('through2').obj


module.exports = function(counter) {
    // counter is a readable stream
    var countries = {}

    function write (object, _, next) {
        if (object['country']) {
            countries[object.country] = (countries[object.country] || 0) + 1
        }
        next()
    }

    function end (next) {
        counter.setCounts(countries)
        next()
    }

    // duplexer(writable side, readable side)
    return duplexer(through(write, end), counter)
}