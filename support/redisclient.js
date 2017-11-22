var redis = require('redis');
var config = require('config');

module.exports = redis.createClient({
    host: config.get('host'),
    port: config.get('port'),
    password: config.get('pass'),
    db: config.get('db')
});
