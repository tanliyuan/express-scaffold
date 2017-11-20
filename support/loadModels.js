var path = require('path');
var logger = require('./log4js').getLogger(__filename);

//先初始化连接数据库
require('./db');

module.exports = function(app) {
    var modelsPath = path.join(__dirname, "../models/");
    require('fs').readdirSync(modelsPath).forEach(function(file) {
        let model = require(modelsPath + file);

        logger.info('load model: ' + path.basename(file));

    });
};