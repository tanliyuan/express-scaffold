const request = require('request');
var express = require('express');
var router = express.Router();
const logger = require('../support/log4js').getLogger(__filename);

let dingTalkMeg = {
    "msgtype": "markdown",
    "markdown": {
        "title":"杭州天气",
        "text": "#### 杭州天气 @156xxxx8827\n" +
        "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
        "> ![screenshot](http://image.jpg)\n"  +
        "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n"
    }

};


router.post('/notify', function (req, res, next) {

    res.end();

    let data = req.body;
    let title = data.title;
    let url = data.url;
    let replyName = data.comments[0].user.nickname;
    let content = data.comments[0].content;
    let text = "#### " + title + " \n" +
    "> 收到"+ replyName +" 的评论\n\n" +
    "> ![screenshot](http://image.jpg)\n"  +
    "> ###### " + content +" [点我]("+ url +") \n";

    dingTalkMeg.markdown.text = text;

    let options = {
        uri: 'https://oapi.dingtalk.com/robot/send?access_token=c839cdf06522bf8a5c27f84f9e6d8fadbdfff80bb5d2f8568ab29c801c2d4172',
        method: 'post',
        headers:{
            'Content-Type':'application/json'
       },
       json: true,
       body: dingTalkMeg
    };

    //开启代理抓包
    if(process.env.proxy) {
        options.proxy = process.env.proxy;
        options.strictSSL = false;
    }

    request(options, function(error, response, body){
        logger.info(body);
    });

});

router.baseUrl = '/changyan';
module.exports = router;
