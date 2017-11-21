var mongoose = require('mongoose');
var config = require('config');
var logger = require('../support/log4js').getLogger(__filename);

mongoose.connect(config.get('db_url'), {
    server: {
       autoReconnect: true
    }
});

var db = mongoose.connection;

db.on('opening', () => {
    logger.info('Database connecting.... %d ', db.readyState);
});

db.on('open', () => {
    logger.info('Database connection opened (＾＿＾)☆');
});

db.on('error', (err) => {
    logger.error('Database connection error (T＿T) %s', err);
});

db.on('reconnected', () => {
    logger.info('Database reconnected (*ﾟﾛﾟ)');
});

db.on('disconnected', () => {
    logger.error('Database disconnected (*ﾟﾛﾟ) ');
});

module.exports = mongoose;