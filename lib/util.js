var path = require('path');
var fs = require('fs');
var _ = {};
module.exports = _;

_.hit = function (file, include, exclude) {
    return include ?
        (exclude ? include.test(file) && !exclude.test(file) : include.test(file)) :
        (exclude ? !exclude.test(file) : true);
};

_.find = function (dir, include, exclude) {
    dir = path.resolve(dir);
    if (!fs.existsSync(dir)) {
        return [];
    }
    var files = [];
    var arr = fs.readdirSync(dir);
    arr.forEach(function (file) {
        file = path.join(dir, file);
        var stat = fs.statSync(file);
        if (stat.isFile()) {
            if (_.hit(file, include, exclude)) {
                files.push(file);
            }
        } else if (stat.isDirectory()) {
            files = files.concat( _.find(file, include, exclude));
        }
    });
    return files;
};