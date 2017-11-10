process.env.NODE_ENV = 'dev';
require('./config');

delete require.cache[require.resolve('config'), require.resolve('./config')];
process.env.NODE_ENV = 'prod';
require('./config');