var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');

var redisClient = require('./redisclient');

module.exports = new RateLimit({
  store: new RedisStore({
    client: redisClient
  }),
  windowMs: 1*60*1000, // 15 minutes 
  max: 2, // limit each IP to 100 requests per windowMs 
  delayMs: 0 // disable delaying - full speed until the max limit is reached 
});