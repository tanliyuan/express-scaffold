import { log } from 'util';

var  router = require('express').Router();
var request = require('request');

var logger = require('../support/log4js').getLogger(__filename);
var githubAuth = require('../support/oauth_github');


router.get('/github', function(req, res, next) {
    let uri = githubAuth.code.getUri();
    res.redirect(uri);
});

router.get('/github/auth', function(req, res, next) {
    githubAuth.code.getToken(req.originalUrl)
        .then(function(user) {
            logger.info(user);

            let userInfoReq = user.sign({
                method: 'get',
                url: 'https://api.github.com/user'
              });

            request(userInfoReq).then(function(userInfo) {
                logger.info(userInfo);

                res.render('index', {title : userInfo});
            });
        });


});

router.baseUrl = '/oauth';
module.exports = router;