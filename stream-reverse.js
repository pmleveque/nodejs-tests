var concat = require('concat-stream');
var through = require('through2');

var tranformAll = concat(function() {
    process.stdout
});

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
}

process.stdin
    .pipe(concat(function (text) {
        console.log(text.toString().reverse());
    }));