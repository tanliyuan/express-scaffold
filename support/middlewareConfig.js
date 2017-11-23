/**
 * 将app.js中中间件相关配置提取到这里
 * @param {*} app 
 */

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
var path = require('path');
var config = require('config');

var session = require('./session');
var loadroutes = require('./loadroutes');
var loadModels = require('./loadModels');
var limitMiddleware = require('./rateLimit');
    require('./mongodb');
var acl = require('./acl');


module.exports = app => {
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(cookieParser(config.get('secret')));

    //session配置
    session(app);

    app.use(express.static(path.join(__dirname, 'public')));
    //swagger-ui 静态资源
    app.use(config.get('api_url'), swaggerUi.serve);

    //  apply to all requests 
    app.use(limitMiddleware);

    // app.use(acl.middleware());

    //自动载入 routes文件夹下的路由
    loadroutes(app);

    // 载入models
    loadModels(app);
};