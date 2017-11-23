var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('config');
var logger = require('../support/log4js').getLogger(__filename);
var acl = require('../support/acl');

mongoose.connect(config.get('db_url'), {
    autoReconnect: true,
    useMongoClient: true
});

var connection = mongoose.connection;

connection.on('opening', () => {
    logger.info('Database connecting.... %d ', connection.readyState);
});

connection.on('open', () => {
    logger.info('Database connection opened (＾＿＾)☆');

    //绑定acl 使用 mongodb
    acl.bindDB.call(acl, mongoose.connection.db);
});

connection.on('error', (err) => {
    logger.error('Database connection error (T＿T) %s', err);
});

connection.on('reconnected', () => {
    logger.info('Database reconnected (*ﾟﾛﾟ)');
});

connection.on('disconnected', () => {
    logger.error('Database disconnected (*ﾟﾛﾟ) ');
});
