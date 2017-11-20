var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var http = require('https');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.baseUrl = '/';
module.exports = router;
