
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */
var moment = require("moment"); // date manipulation library
var skullModel = require('../models/skullModel.js');
var request = require('request');
var user = require('../models/user.js'); 


var projectTitle = "SKULLWALL";
var textHolder = "";


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
		slug : req.body.skullName.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'),
		skull : req.body.skullDrawing,
		cred : req.body.cred,
		candles : 0
		});
			
		newSkull.save(function(err){
		
		var uniqueSkullQuery = skullModel.findOne({ slug : newSkull.slug});
		uniqueSkullQuery.exec(function(err, foundSkull){

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
	}); // end of .findOne query
}

exports.done = function(req,res) {

	skullModel.find({}, 'slug skull name candles', function(err, allSkulls) {

		if (err) {
			console.error("error on finding skulls for display");
			console.error(err);
		}
		if (allSkulls == null) {
			console.log("no skulls, sorry");
		} else {
			console.log("found some skulls");

			// for (i in allSkulls){
			// 	var candleIMG = [];
			// 	//console.log("slug: " + allSkulls[i].slug + " | candles: " + allSkulls[i].candles);
			// 	//image for candles
			// 	if(allSkulls[i].candles == 3 ){
			// 		candleIMG[i] = 'candle03.gif';
			// 	} else {
			// 		candleIMG[i] = 'candle00.gif';
			// 	}
			// 	console.log(candleIMG[i]);
			// }


				var templateData = {
				skulls : allSkulls
				}

			res.render('done.html', templateData); 
			
			}
		});
}


exports.inspired = function(req, res) {
	
	console.log("inspiration page requested");

	var templateData = {
		title : projectTitle,
	}

	res.render('inspired.html', templateData);
}

exports.remote_api = function(req, res) {
	
	console.log("JSON data requested");

	var remote_api_url = 'http://skullwall2.herokuapp.com/data/';
	//var remote_api_url = 'http://localhost:5000/data/';

	request.get(remote_api_url, function(error, response, data){

		if (error){
			res.send("error requesting skullwall api");
		}

		//convert json to native JS object
		var apiData = JSON.parse(data);

		//if apiData has property "status == OK" then success
			if (apiData.status == 'OK'){
				//prepare template

				var templateData = {
					skulls : apiData.skulls,
					name : apiData.name,
					candles : apiData.candles,
					//rawJSON : data,
					remote_url : remote_api_url,
					layout : false
				}
				return res.render('skullwall-api.html',templateData);
			}

		})
}

exports.data = function(req, res) {
	
	console.log("JSON data requested");

	skullQuery = skullModel.find({});
	skullQuery.exec(function(err, allSkulls){

		var jsonData = {
			status : "OK",
			skulls : allSkulls
		}

		res.json(jsonData);
	});

}

exports.skullData = function(req, res) {
	
	console.log("Individual Skull JSON data requested");
	var skullSlug = req.params.skull_slug;
		console.log(skullSlug);

	skullQuery = skullModel.findOne({slug:skullSlug});
		skullQuery.exec(function(err, skull){

		var jsonData = {
			status : "OK",
			skulls : skull,
			layout : false
		}

		res.json(jsonData);
	});

}

exports.skullDetail = function(req,res){

	var skullSlug = req.params.skull_slug;


	var skullQuery = skullModel.findOne({slug:skullSlug});
		skullQuery.exec(function(err, skull){

			if (err) {
				console.log('error finding skull');
			}
			if (skull != null){
				var templateData = {
					skull : skull,
					layout : false
				};

				res.render('admin.html', templateData);

			} else {
				console.log('unable to find that skull');
				return res.status(404).render('404.html');
			}
		});
}

exports.updateSkull = function(req,res){

	// get slug from url
	var skull_slug = req.params.skull_slug;

	// prep form
	var updatedData = {
		candles : req.body.candles,
		layout : false
	}

	// get this skull
	skullModel.update({slug:skull_slug}, { $set: updatedData }, function(err, skull){

		if (err) {
			console.log('error on update');
		}
		if (skull != null){
			res.redirect('/skulls/'+skull_slug);
		} else {
			console.log('unable to find' + skull +"skull");
			return res.status(404).render('404.html');
		}
	});

}


exports.loginSuccess = function(req,res){
	
		var templateData ={
			status: "OK",
		}
	return res.render('login-success.html', templateData);

}


exports.userMakeDrawing = function(req,res) {
	var templateData = {
		updatedText : textHolder,
		currentUser : req.user
	}
	res.render('draw.html', templateData); 
}

// exports.adminsecGet = function(req, res) {
	
// 	console.log("admin page GET req");

// 	skullQuery = skullModel.find({});
// 	skullQuery.exec(function(err, allSkulls){

// 		var templateData = {
// 			status : "OK",
// 			skulls : allSkulls
// 		}

// 		return res.render('admin.html', templateData);
// 	});

// }


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






