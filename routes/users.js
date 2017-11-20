var express = require('express');
var router = express.Router();
var userService = require('../services/userService');

router.get('/:name', function(req, res, next) {
    let userName = req.params.name;
    userService.getUserByLoginName(userName, function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.json({'message': '用户不存在'});
          return;
        } 

        res.json(user);
    });
});

router.post('/save', function(req, res, next) {
    let userName  = req.body.name;
    let age = req.body.age;
    userService.newAndSave(userName, age, (err) => {
        if(err) {
            next(err);
        }

        res.json({"success": true});
    });
});

router.baseUrl = '/user';
module.exports = router;
