var mymodule = require('./mymodule')

var options = {
    dirName: process.argv[2],
    fileExt: process.argv[3]
}



mymodule(options.dirName, options.fileExt, function (err) {
    if (err) {
        throw new Error(err)
    }
})

