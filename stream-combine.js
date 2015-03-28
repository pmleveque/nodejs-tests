var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through2');


module.exports = function () {
    var current;

    var analyse = through(write, end);

    function write (line, _, next) {
        if (line.length == 0) return next();

        obj = JSON.parse(line);
        if (obj.type == "genre") {
            if (current) {
                this.push(JSON.stringify(current) + '\n');
            }
            current = {name: obj.name, books: []};
        }
        else if (obj.type == "book") {
            current.books.push(obj.name);
        }
        next();
    }

    function end (next) {
        this.push(JSON.stringify(current) + '\n');
        next();
    }

    return combine(split(), analyse, zlib.createGzip());
}