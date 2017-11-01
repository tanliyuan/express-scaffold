var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var http = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var dingTalkMeg = {
    "msgtype": "markdown",
    "markdown": {
        "title":"杭州天气",
        "text": "#### 杭州天气 @156xxxx8827\n" +
        "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
        "> ![screenshot](http://image.jpg)\n"  +
        "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n"
    }

};

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post('/notify', function (req, res, next) {
    console.log(req.body);
    var data = req.body;
    var title = data.title;
    var url = data.url;
    var replyName = data.comments[0].user.nickname;
    var content = data.comments[0].content;
    var text = "#### " + title + " \n" +
    "> 收到"+ replyName +" 的评论\n\n" +
    "> ![screenshot](http://image.jpg)\n"  +
    "> ###### " + content +" [点我]("+ url +") \n";

    dingTalkMeg.markdown.text = text;

    var contents = JSON.stringify(dingTalkMeg);
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
    res.end();

});
module.exports = router;
