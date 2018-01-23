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

//   http://tu-img-1.aixinxi.net/o_1c0imggpt3rkd9kkuv4sbiu5a.jpg-w.jpg

var img_arr = [
    '', '',
    "https://t1.aixinxi.net/o_1c2rbg59llo71vckrf111fulr7a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdk01913ad1nlp1u9k38gj0na.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rde6dh4ol1p95jhm22m52sa.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdd2h9bnthcc1shf61v5fa.jpg-w.jpg",
    '', '',
    "https://t1.aixinxi.net/o_1c2rdc6m4fbk1e2315rienl654a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rbbi4klc6fm1acm13k315v5a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rav6tjnom1v7q1uonatk7kja.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdkqle1g4rt5mkngd7nahja.jpg-w.jpg",

    "https://t1.aixinxi.net/o_1c2rb95r3gfd1uko1nqv4kq1feja.jpg-w.jpg",
 
     "https://t1.aixinxi.net/o_1c2radard1cipuc71mhpo51k16a.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rakh121qlp1bok18l81ulj1gfla.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rb7nck1bam19n61r3aqek1kr9a.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rbjlcu1h3e1drq1l8h1njvlf5a.jpg-w.jpg",
     "https://t1.aixinxi.net/o_1c2rdb0mocu7u3a19dbflc1j0la.jpg-w.jpg",

    "https://t1.aixinxi.net/o_1c2rdllo01anr7tbqfi1hla1kvda.jpg-w.jpg",
    "http://t1.aixinxi.net/o_1c2rb8gjn23oscd1vcr18sf7c4a.jpg-w.jpg",
 
    "https://t1.aixinxi.net/o_1c2rba6a23bq1ej41qpp1tvs1ki5a.jpg-w.jpg",
    "https://t1.aixinxi.net/o_1c2rdignd1gvv1j1c13co259v9da.jpg-w.jpg",
    "http://t1.aixinxi.net/o_1c4f3o13j4isr4ehv71pn1t11a.jpeg-w.jpg",
    "http://t1.aixinxi.net/o_1c4f3o13j4isr4ehv71pn1t11a.jpeg-w.jpg",
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

    '','',

    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月亮很亮**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我很困**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明天的早餐在等我**\n\n" ,

    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;王子能救出公主，**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是因为恶龙从没想过伤害她。**\n\n", 

    '',
    
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我去过的过去**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;谁同行 谁远行**\n\n" +
    "> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;那件风衣 叫做回忆**\n\n" ,

    '', '', '', '',

    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;没梳的头发有点乱**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;屋檐上麻雀在逃难**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嗓子的疼痛有点重**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这一天我什么都不想干**\n\n', 

    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;夜晚的心像一条街**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想一件事**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;就亮一盏灯**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想多了**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;就灯火通明了**\n\n', 

    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有没有那么一个世界**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;永远不天黑**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;星星太阳万物都听我的指挥**\n\n',



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

    '', '',

    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告诉我**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;答案是什么**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;香菜或葱花**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;番薯或地瓜**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;火锅不吃吗**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;烧烤你爱吗**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我问太多了**\n\n' ,

    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;告诉我**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;答案是什么**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;香菜或葱花**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;番薯或地瓜**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;火锅不吃吗**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;烧烤你爱吗**\n\n' + 
    '> **&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我问太多了**\n\n' 

];
var today = parseInt(moment().format('DD'));
logger.info("----"  + today);

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
