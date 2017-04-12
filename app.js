
var express = require('express'),
	bodyParser= require('body-parser'),
	app = express(),
	MongoClient = require('mongodb').MongoClient, 
	assert = require('assert'),
	connectiondb = require("./connection.js");


var db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// app.use(express.static('vendor'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// app.listen(7500, function(){
// 	console.log('Example app listening on port 7500!');
// });


// var url = 'mongodb://localhost:32768';
var url = connectiondb.db.local;
MongoClient.connect(url, (err, database) => {
	if (err) return console.log(err)
	db = database;
	app.listen(7500, () => {
		console.log('listening on 7500');
	})
})


// request, response

// Show qoutes
app.get('/', (req, res) => {
	db.collection('quotes').find().sort({name: 1}).toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {quotes: result})
	})

});

// Add qoute
app.post('/quotes', (req, res) => {
	var newData = req.body;
	newData.itemId = Date.now().toString();

	db.collection('quotes').save(newData, (err, result) => {
		if (err) return console.log(err);
		console.log('Saved to database');
		res.redirect('/');
	});
});

// Update qoute
app.put('/quotes', (req, res) => {
	var newDate = Date.now().toString();
	db.collection('quotes').update({itemId: req.body.itemId}, 
	{
		$set: {
			name: req.body.name,
			quote: req.body.quote
		}
	}, 
	{
		sort: {
			_id: -1
		}
	}, (err, result) => {
		if (err) return res.send(err);
		console.log('Update in database');
		res.send(result);
	})
});

// Delete qoute
app.delete('/quotes', (req, res) => {
	// db.collection('quotes').remove({},
	db.collection('quotes').findOneAndDelete({itemId: req.body.itemId},
	(err, result) => {
		if (err) return res.send(500, err)
		console.log('deleted from database');
		res.send(result);
	})
});


// Delete all qoute
app.delete('/quotesDeleteAll', (req, res) => {
	db.collection('quotes').remove({},
	(err, result) => {
		if (err) return res.send(500, err)
		console.log('deleted all quotes from database');
		res.send(result);
	})
});


