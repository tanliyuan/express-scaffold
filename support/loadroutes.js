require('colors');
const logger = require('./log4js').getLogger(__filename);
const path = require('path');

module.exports = app => {
    const normalizedPath = require("path").join(__dirname, "../routes/");

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        let router = require(normalizedPath + file);
        app.use(router.baseUrl, router);

        //打印路由信息
        logger.info('url mapper file: ' + path.basename(file));
        router.stack.forEach(layer => {
            let r_path = layer.route.path;
            let method = Object.keys(layer.route.methods)[0];
            logger.info('----------' + method.green + '  ' + router.baseUrl + '/' + r_path);
        });
    });

};