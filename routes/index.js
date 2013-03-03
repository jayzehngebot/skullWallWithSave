
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */
var moment = require("moment"); // date manipulation library
var skullModel = require('../models/skullModel.js');

exports.index = function(req, res) {
	
	console.log("main page requested");

	var templateData = {
		title : projectTitle,
	}

	res.render('index.html', templateData);
}


exports.makeDrawing = function(req,res) {
	var templateData = {
		updatedText : textHolder
	}
	res.render('draw.html', templateData); 
}

exports.postDrawing = function(req,res) {
	//var templateData = [];
		console.log("posting a drawing");
		console.log(req.body);

		var newSkull = new skullModel({
		name : req.body.skullName,
		skull : req.body.skullDrawing
		});
			
		newSkull.save(function(err){
		if (err) {
			console.error("Error on saving new skull");
			console.Error("err");
			return res.send("There was an error when creating a new skull");

		} else {
			console.log("Created a new skull");
			console.log(newSkull);
			
			res.redirect('/done');
		}

	});
}

exports.done = function(req,res) {

	skullModel.find({}, 'skull', function(err, allSkulls) {

		if (err) {
			console.error("fuck");
			console.error(err);
		}
		if (allSkulls == null) {
			console.log("no skulls, sorry");
		} else {
			console.log("found some skulls");
				var templateData = {
				skulls : allSkulls
				}

			res.render('done.html', templateData); 
			
			}
		});
}


// exports.postlibs = function(req,res) {
// 	console.log("posted a word")
// 	var submittedWord = ""
// 	submittedWord = req.body.dog;

// 	var writeNewWord = function() {
// 		var n = madSetParagraph.text.replace("adj01",submittedWord);
// 	    textHolder = n;
// 	}

// 	writeNewWord();

// 	res.redirect('/updated')
// }



var projectTitle = "SKULLWALL";

var textHolder = "";



