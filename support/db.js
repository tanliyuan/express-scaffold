var mongoose = require('mongoose');
var config = require('config');
var logger = require('../support/log4js').getLogger(__filename);

mongoose.connect(config.get('db_url'), {

}, function(err) {
    if(err) {
            logger.error('connect to %s error: ', config.get('db_url'), err.message);
            process.exit(1);
    } else {
        logger.info('db connect success (^_^) !');
    }
});

module.exports = mongoose;