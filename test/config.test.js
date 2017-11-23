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

