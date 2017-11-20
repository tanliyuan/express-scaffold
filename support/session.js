var session = require('express-session');
var config = require('config');
var RedisStore = require('connect-redis')(session);


//MongoDB
// const MongoStore = require('connect-mongo')(session);
// app.use(session({
//   secret: config.get('secret'),//与cookieParser中的一致
//   resave: true,
//   saveUninitialized: false,
//   name: 'sessionId',
//   store : new MongoStore({ 
//       url: config.get('db_url')
//    })
// }));

module.exports = function (app) {

    app.use(session({
        secret: config.get('secret'),
        resave: true,
        saveUninitialized: true,
        name: 'sessionId',
        store: new RedisStore({
            port: config.get('port'),
            host: config.get('host'),
            db: config.get('db'),
            pass: config.get('pass')
        })
    }));
};