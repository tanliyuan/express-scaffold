var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var http = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/notify', function (req, res, next) {
    console.log(req.body);

    var contents = JSON.stringify(req.body);
    var options = {
        protocol:'https:',
        port:443,
        host: 'oapi.dingtalk.com',
        path: '/robot/send?access_token=c839cdf06522bf8a5c27f84f9e6d8fadbdfff80bb5d2f8568ab29c801c2d4172',
        method: 'post',
        headers:{
            'Content-Type':'application/json'
       }
    };
    var reqNew = http.request(options, function(response){
        // 不断更新数据
        var body = '';
        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function() {
            // 数据接收完成
            console.log('---',body);
        });

    });
    reqNew.write(contents);
    reqNew.end();

});
module.exports = router;
