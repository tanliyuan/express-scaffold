module.exports = app => {
    var normalizedPath = require("path").join(__dirname, "../routes/");
    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        let router = require(normalizedPath + file);
        app.use(router.baseUrl, router.router);
    });
};