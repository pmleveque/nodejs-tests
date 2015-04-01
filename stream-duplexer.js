var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
    var fn = spawn(cmd, args);
    // duplexer(writable side, readable side)
    return duplexer(fn.stdin, fn.stdout);
};