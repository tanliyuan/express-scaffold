var RateLimit = require('express-rate-limit');
var RedisStore = require('rate-limit-redis');

var redisClient = require('./redisclient');

module.exports = new RateLimit({
  store: new RedisStore({
    client: redisClient
  }),
  windowMs: 1*60*1000, // 15 minutes 
  max: 10, // limit each IP to 100 requests per windowMs 
  delayMs: 0 ,// disable delaying - full speed until the max limit is reached ,
  keyGenerator: function(req) {
      let real_ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;  
      return real_ip;
  },
  message: '目前限流 QPS: 10req/ip/min'
});