const request = require('request');
var express = require('express');
var schedule = require('node-schedule');
var moment = require('moment');
var config = require('config');
var router = express.Router();
const logger = require('../support/log4js').getLogger(__filename);

var j = schedule.scheduleJob('0 2 22 * * 1-5', function(){
    logger.info('发送钉钉提醒' + moment().format());
    wanan();
});

//   http://tu-img-1.aixinxi.net/o_1c0imggpt3rkd9kkuv4sbiu5a.jpg-w.jpg

var img_arr = [
    '', '',
    "https://t1.aixinxi.net/o_1c2rbg59llo71vckrf111fulr7a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdk01913ad1nlp1u9k38gj0na.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rde6dh4ol1p95jhm22m52sa.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdd2h9bnthcc1shf61v5fa.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rav6tjnom1v7q1uonatk7kja.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rb95r3gfd1uko1nqv4kq1feja.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rdkqle1g4rt5mkngd7nahja.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2radard1cipuc71mhpo51k16a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rbjlcu1h3e1drq1l8h1njvlf5a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rakh121qlp1bok18l81ulj1gfla.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rb7nck1bam19n61r3aqek1kr9a.jpg-w.jpg",
    "http://t1.aixinxi.net/o_1c2rb8gjn23oscd1vcr18sf7c4a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rba6a23bq1ej41qpp1tvs1ki5a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdignd1gvv1j1c13co259v9da.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdc6m4fbk1e2315rienl654a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rbbi4klc6fm1acm13k315v5a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdb0mocu7u3a19dbflc1j0la.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdllo01anr7tbqfi1hla1kvda.jpg-w.jpg",
    "http://t1.aixinxi.net/o_1c122ehbfr2nui01e4g67d1pvaa.jpg-w.jpg"

];

let wananContents = [
    '', '',
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我对世界说晚安，**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;世界会怎么回答我？**\n\n",

    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告诉全世界我要安稳的睡去，**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;愿所有人都有个好梦。**\n\n",

    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;就歌唱吧，眼睛眯起来**\n\n",

    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;习惯道晚安，从不真睡觉**\n\n",


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
    "它都铭记于心**\n\n",
];
var today = parseInt(moment().format('DD'));

let wananMsg = {
    "msgtype": "markdown",
    "markdown": {
        "title": "考勤提醒", 
        "text": 
        wananContents[today] +
        "> ![screenshot](" + img_arr[today] + ")\n"  
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
