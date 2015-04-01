var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:name', function(req, res, next) {
	res.render('poll', { name: req.params.name });
});

router.post('/create/', function(req, res, next){
	var db = req.db;
	db.collection('sessions').insert(req.body, function(err, result){
	res.send(
			(err === null) ? { msg: ''} : { msg : err}
		);
	});
});

router.get('/get/:name', function(req, res, next){
	var name = req.params.name;
	var db = req.db;
	db.collection('sessions').find({
		name: name
	}).toArray(function(err, items){
		res.json(items);
	});
});

module.exports = router;
