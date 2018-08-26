var fs = require('fs')
var path = './db.json'
exports.find = function (callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
exports.findById=function(id,callback){
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var file = JSON.parse(data).students;
        var match=file.find(function (item) {
            return item.id===id
        })
        callback(null,match)
})
}

exports.save = function (student, callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var file = JSON.parse(data).students;
        student.id = file[file.length - 1].id + 1;
        file.push(student);
        var files = JSON.stringify({students: file})
        fs.writeFile(path, files, function (err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    })
};
exports.update = function (student, callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var file = JSON.parse(data).students;
        student.id=parseInt(student.id)
        var match=file.find(function (item) {
           return item.id===student.id
        })
        for (var key in match) {
            match[key]=student[key]
        }

        var files = JSON.stringify({students: file})
        fs.writeFile(path, files, function (err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    })
}


exports.del = function (id,callback) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var file = JSON.parse(data).students;
            var index=file.findIndex(function (item) {
                return item.id===parseInt(id)
            })
        file.splice(index,1);
        var files = JSON.stringify({students: file})
        fs.writeFile(path, files, function (err) {
            if (err) {
                return callback(err)
            }
            callback()
        })
    })
}