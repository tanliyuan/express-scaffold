// process.env.NODE_ENV = 'dev';
// require('./config');

// delete require.cache[require.resolve('config'), require.resolve('./config')];
// process.env.NODE_ENV = 'prod';
// require('./config');
var should = require('should');

describe('config测试' , function() {
    it('override default', () => {
        (2).should.be.exactly(2);
    });
});

describe('OAuth2',function(){
    var OAuth = require('oauth');
       var ClientOAuth2 = require('client-oauth2');
   
     it('gets bearer token', function(done){
       var OAuth2 = OAuth.OAuth2;    
       var twitterConsumerKey = 'd573dc74f4cc4460e811';
       var twitterConsumerSecret = 'bb5130765b575b4512e9482c268f4504c9f1f737';
       
      var githubAuth = new ClientOAuth2({
        clientId: twitterConsumerKey,
        clientSecret: twitterConsumerSecret,
        accessTokenUri: 'https://github.com/login/oauth/access_token',
        authorizationUri: 'https://github.com/login/oauth/authorize',
        redirectUri: 'https://node.tanliyuan.top/oauth/',
        scopes: ['notifications', 'gist']
      });
      console.log(githubAuth);
      done();
     });
    });
