
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


exports.draw = function(req,res) {
	var templateData = {
		updatedText : textHolder
	}
	res.render('draw.html', templateData); 
}


exports.postlibs = function(req,res) {
	console.log("posted a word")
	var submittedWord = ""
	submittedWord = req.body.dog;

	var writeNewWord = function() {
		var n = madSetParagraph.text.replace("adj01",submittedWord);
	    textHolder = n;
	};

	writeNewWord();

	res.redirect('/updated')
}

var projectTitle = "SKULLWALL";

var textHolder = "";

