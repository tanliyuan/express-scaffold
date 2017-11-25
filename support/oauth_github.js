var ClientOAuth2 = require('client-oauth2');
var config = require('config');
var uuidV5 = require('uuid/v5');


var githubAuth = new ClientOAuth2({
    clientId: config.client_id,
    clientSecret: config.client_secret,
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    redirectUri: config.redirect_rri,
    scopes: ['user', 'gist'],
    state: uuidV5(config.domain, uuidV5.URL)
});

module.exports = githubAuth;