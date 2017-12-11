const request = require('request');
var express = require('express');
var schedule = require('node-schedule');
var moment = require('moment');
var config = require('config');
var router = express.Router();
const logger = require('../support/log4js').getLogger(__filename);

var night = schedule.scheduleJob('0 14 22 * * *', function(){
    logger.info('晚安提醒' + moment().format());
    workday(nightContent,moment().format("YYYYMMDD"), true, config.get('mobile1'));
});

var morning = schedule.scheduleJob('0 39 8 * * *', function(){
    logger.info('早安提醒' + moment().format());
    workday(morningContent, moment().format("YYYYMMDD"), true, config.get('mobile1'));
});

var night2 = schedule.scheduleJob('0 15 22 * * *', function(){
    logger.info('晚安提醒' + moment().format());
    workday(nightContent,moment().format("YYYYMMDD"), true, config.get('mobile2'));
});

var morning2 = schedule.scheduleJob('0 40 8 * * *', function(){
    logger.info('早安提醒' + moment().format());
    workday(morningContent, moment().format("YYYYMMDD"), true, config.get('mobile2'));
});


router.get('/notify', function(req, res, next) {
    let type = req.query.type;
    res.end();


    if(type == 0) {
        voiceNotify(morningContent);
    } else {
        voiceNotify(nightContent);
    }
});

router.get('/workday', function(req, res, next) {
    let date = req.query.date;

    res.end();


    workday(morningContent, date, false, config.get('mobile1'));
});

let morningContent = {
    "apikey": config.get('apikey'),
    "mobile": config.get('mobile1'),
    "tpl_id": config.get('tpl_id_morning'),
    "tpl_value": 'name%3d%e5%b0%8f%e7%86%8a'
};

let nightContent = {
    "apikey": config.get('apikey'),
    "mobile": config.get('mobile1'),
    "tpl_id": config.get('tpl_id_night'),
    "tpl_value": 'name%3d%e5%b0%8f%e7%86%8a'
};

var workday = function(content, date, notify, mobile) {
    content.mobile = mobile;

    var url = ["http://api.k780.com/?app=life.workday", 
                    "date=" + date,
                    "appkey=" + config.get('workday_apikey'),
                    "sign=" + config.get('workday_sign'),
                    "format=json"].join('&');


    request(url, function(error, response, body){
        logger.info(body);
        body = JSON.parse(body);
        if(notify == true && body.success == "1" && body.result.workmk == "1") {
           voiceNotify(content);
        }
    });

};

var voiceNotify = function(content) {
    let options = {
        uri: "https://voice.yunpian.com/v2/voice/tpl_notify.json",
        method: 'post',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
       },
       form: content 
    };


    request(options, function(error, response, body){
        if(!error) {
            logger.info(body);
        }
    });

};

router.baseUrl = '/voice';
module.exports = router;