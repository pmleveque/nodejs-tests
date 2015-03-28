var duplexer = require('duplexer');
var spawn = require('child_process').spawn;

module.exports = function (cmd, args) {
    var fn = spawn(cmd, args);
    return duplexer(fn.stdin, fn.stdout);
};