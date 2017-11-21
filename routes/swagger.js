var express = require('express');
var config = require('config');
const swaggerUi = require('swagger-ui-express');
var router = express.Router();

var swaggerSpec = require('../support/swagger');

// Serve swagger docs the way you like (Recommendation: swagger-tools)
router.get('/api-docs.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.get('/', swaggerUi.setup(swaggerSpec));

router.baseUrl = config.get('api_url');
module.exports = router;