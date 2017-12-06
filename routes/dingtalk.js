const request = require('request');
var express = require('express');
var schedule = require('node-schedule');
var moment = require('moment');
var config = require('config');
var router = express.Router();
const logger = require('../support/log4js').getLogger(__filename);

var j = schedule.scheduleJob('0 0 22 * * 1-5', function(){
    logger.info('发送钉钉提醒' + moment().format());
    wanan();
});


let wananMsg = {
    "msgtype": "markdown",
    "markdown": {
        "title": "考勤提醒", 
        "text": 
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "街角的路灯**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "睡眼惺忪**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "别让它等太久**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "和考勤机 道声晚安吧**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "你的付出**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "从未被漠视**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "点点滴滴**\n\n" +
        "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
        "它都铭记于心**\n\n" +
        "> ![screenshot](http://tu-img-1.aixinxi.net/o_1c0imggpt3rkd9kkuv4sbiu5a.jpg-w.jpg)\n"  
    },
    "at": {
        "isAtAll": true
    }
};

var wanan = function() {
    let options = {
        uri: config.get('dingtalk'),
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
