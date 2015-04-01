var fs = require('fs');
var path = require('path');

var options = {
    dirName: process.argv[2],
    fileExt: process.argv[3]
}

fs.readdir(options.dirName, function (err, list) {
    list.filter(function (file) {
        return (path.extname(file).search(options.fileExt) > 0)
    }).forEach(function (file) {
        console.log(file);
    })
})

