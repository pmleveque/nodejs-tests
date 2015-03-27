var fs = require('fs');
var path = require('path');

module.exports = function (file_path, file_ext, callback) {
    fs.readdir(file_path, function(err, list){
        if (err) {
            return callback(err, null);
        }

        var new_list = [] ;
        for (var i = 0; i < list.length; i++) {
            if (path.extname(list[i]) == '.' + file_ext) {
                new_list[i] = list[i];
            }
        }
        callback(null, new_list);
    });
};
