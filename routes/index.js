var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    statusCode: 200,
    message: 'Success'
  });;
});

module.exports = router;
