
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */


exports.index = function(req, res) {
	
	console.log("main page requested");

	var templateData = {
		title : projectTitle,
		//text : madSetParagraph.text,
		//numberOfWordsNeeded : madSetParagraph.numberOfWordsNeeded
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
	var templateData = [];
		console.log("posting a drawing");
		console.log(req.body);

		var newSkull = {
		skull : req.body.textArea,
		name : req.body.skullName,
		}

		skulls.push(newSkull);

		console.log(skulls);

		//console.log(finishedDrawing);
	
	res.render('/doneDrawing.html', templateData); 
}

exports.doneDrawing = function(req,res) {
	var templateData = {
		skulls : skulls,
	}
	res.render('doneDrawing.html', templateData); 
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

var skulls = [];



