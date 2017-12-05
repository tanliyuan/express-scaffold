const request = require('request');
var express = require('express');
var schedule = require('node-schedule');
var moment = require('moment');
var router = express.Router();
const logger = require('../support/log4js').getLogger(__filename);

var j = schedule.scheduleJob('0 0 22 * * 1-5', function(){
    logger.info('发送钉钉提醒' + moment().format());
    wanan();
});


let wananMsg = {
    "msgtype": "markdown",
    "markdown": {
        "title": "夜深了", 
        "text": 
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "街角的路灯**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "睡眼惺忪**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "别让她等太久**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "和考勤机 道声晚安吧**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "你的付出**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "从未被漠视**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "点点滴滴**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "她都铭记于心**\n\n" +
        "> ![screenshot](http://tu-img-1.aixinxi.net/o_1c0imggpt3rkd9kkuv4sbiu5a.jpg-w.jpg)\n",   
        "hideAvatar": "1", 
        "btnOrientation": "1", 
        "btns": [
            {
                "title": "稍后提醒", 
                "actionURL": "https://www.dingtalk.com/"
            }, 
            {
                "title": "已请安", 
                "actionURL": "https://www.dingtalk.com/"
            }
        ]
    },
    "at": {
        "atMobiles": [
            "17858636842"
        ], 
        "isAtAll": false
    }
};

var wanan = function() {
    let options = {
        uri: 'https://oapi.dingtalk.com/robot/send?access_token=867146577564d6bfb749c55c44c886ee2de6bb62f31e98bcdcce6e2b38ff27db',
        method: 'post',
        headers:{
            'Content-Type':'application/json'
       },
       json: true,
       body: wananMsg 
    };


    request(options, function(error, response, body){
        logger.info(body);
    });
};


router.get('/notify', function (req, res, next) {

    res.end();

    wanan();

});

router.get('/cancel', function(req, res, next) {

    res.end();
});

router.baseUrl = '/goodnight';
module.exports = router;
