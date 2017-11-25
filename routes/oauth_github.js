var  router = require('express').Router();
var logger = require('../support/log4js').getLogger(__filename);

var ClientOAuth2 = require('client-oauth2');
var twitterConsumerKey = 'd573dc74f4cc4460e811';
var twitterConsumerSecret = 'bb5130765b575b4512e9482c268f4504c9f1f737';

var githubAuth = new ClientOAuth2({
    clientId: twitterConsumerKey,
    clientSecret: twitterConsumerSecret,
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    scopes: ['notifications', 'gist']
});

router.get('/github', function(req, res, next) {
    let uri = githubAuth.code.getUri();
    res.redirect(uri);
});

router.get('/github/auth', function(req, res, next) {
    githubAuth.code.getToken(req.originalUrl)
        .then(function(user) {
            logger.info(user);
            return res.send(user.accessToken);
        });


});

router.baseUrl = '/oauth';
module.exports = router;