var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next){
    var name = req.body.username;
    var passwd = req.body.passwd;
    var session = req.session;
    var result = {};

    if('tanliyuan' === name && '123456' === passwd) {
        session.user = {
            "name": "tan",
            "age": 30
        };

        result.success = true;
    } else {
        result.success = false;
    }

    res.json(result);
});

router.baseUrl = '/login';
module.exports = router;