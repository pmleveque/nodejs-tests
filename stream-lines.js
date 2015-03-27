var through = require('through2');
var split = require('split');

var stream = through(evenOdd(), end);

function evenOdd(){
    var i = 1;
    return function write(line, encoding, next) {
        this.push(i % 2 === 1
            ? line.toString().toLowerCase() + '\n'
            : line.toString().toUpperCase() + '\n'
        );
        ++i;
        next();
    }
}

function end() {
    this.push(null);
}

process.stdin
    .pipe(split())
    .pipe(stream)
    .pipe(process.stdout);