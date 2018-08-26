var fs = require('fs');
var student = require('./student')
var express = require('express');
var router = express.Router();
// student.update(
// {
//     "name": "7",
//     "gender": "1",
//     "age": "231",
//     "hobbies": "36",
//     "id": 11
// },function (e) {
//         if (e){
//             console.log('失败')
//         }
//             console.log('成功')
//     });

router.get('/students', function (req, res) {
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('server error')
    //     }
    //     res.render('index.html', {
    //         students: JSON.parse(data).students
    //     })
    // })
    student.find(function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('index.html', {students: data})
    })
})
router.get('/students/new', function (req, res) {
    res.render('new.html')
})
router.post('/students/new', function (req, res) {
    // fs.readFile('./db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('server error')
    //     }
    //     var file=JSON.parse(data).students;
    //     req.body.id=file.length+1;
    //     file.push(req.body);
    //     var files={}
    //     files.students=file;
    //     console.log(file)
    //     fs.writeFile('./db.json',JSON.stringify(files),function (err) {
    //         res.redirect('/students')
    //     })
    //
    // })
    student.save(req.body, function (e) {
        if (e) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})
router.get('/students/edit', function (req, res) {
    student.findById(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('edit.html', {
            stu: data
        })

    })
})

router.post('/students/edit', function (req, res) {
    student.update(req.body, function (e) {
        if (e) {
            return res.status(500).send('server error')
        }
        res.redirect('/students')
    })
})
    router.get('/students/del', function (req, res) {
        student.del(req.query.id, function (e) {
            if (e) {
                return res.status(500).send('server error')
            }
            res.redirect('/students')
        })
    })


    module.exports = router