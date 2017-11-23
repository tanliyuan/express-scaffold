var acl = require('acl');
var logger = require('./log4js').getLogger(__filename);

// 由于mongoose 异步连接，这里无法取到实例化好的db, 故 db 参数在 mongodb.js 中 open 事件确定db建立后赋值
acl = new acl(new acl.mongodbBackend(null, 'acl_', true), logger);

acl.bindDB = function(db) {
    this.backend.db = db;
};

module.exports = acl;