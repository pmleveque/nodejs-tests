var http = require('http');
var through = require('through2');

function write (msg, _, next) {
    this.push(msg.toString().toUpperCase());
    next();
}

function end () {
    this.push(null);
}

var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        req.pipe(through(write, end)).pipe(res);
    } else {
        res.end('send me a POST\n');
    }
});

server.listen(process.argv[2]);

