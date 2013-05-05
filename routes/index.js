
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


var Photo = require('../models/photo.js');

var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var s3 = new AWS.S3();



exports.index = function(req, res) {
	
	console.log("main page requested");

	var templateData = {
		title : projectTitle,
	}

	if (req.user) {
      // res.json({ username: req.user.username, email: req.user.email });
      console.log('user is logged in as :'+ req.user.username);
      templateData["currentUser"] = req.user.username;
    } else {
      //res.json({ anonymous: true });
      console.log('user is anon');
    }

	res.render('index.html', templateData);
}

exports.makeDrawing = function(req,res) {
	var templateData = {
		updatedText : textHolder
	}

	if (req.user) {
      // add currentUser to template Data
      templateData["currentUser"] = req.user.username;
    } 

	res.render('draw.html', templateData); 
}

///////////////////


exports.makeDrawingTwo = function(req,res) {
	var templateData = {
		updatedText : textHolder
	}

	if (req.user) {
      // add currentUser to template Data
      templateData["currentUser"] = req.user.username;
    } 

	res.render('drawTwo.html', templateData); 
}


///////////////



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



exports.postDrawingTwo = function(req,res) {
	//var templateData = [];
		console.log("posting a drawing");
		console.log(req.body);

		var dataUrlOpaque = req.body.skullDrawingOpaque;
		var dataUrlTranslucent = req.body.skullDrawingTranslucent;
		
		//var dataUrlOpaquePNG = dataUrlOpaque.replace("image/png", "image/octet-stream");
		//var dataUrlTranslucentPNG = dataUrlTranslucent.replace("image/png", "image/octet-stream");

		var newSkull = new skullModel({
		name : req.body.skullName,
		slug : req.body.skullName.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_'),
		skullOpaque : req.body.skullDrawingOpaque,
		skullTranslucent : req.body.skullDrawingTranslucent,
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

				var templateData = {
				skulls : allSkulls
				}

			res.render('done.html', templateData); 
			
			}
		});
}


exports.inspired =  function(req,res){

  // query for all images
  var photoQuery = Photo.find({});
  photoQuery.sort('-created');
  photoQuery.exec(function(err, photos){
    if (err) {
      console.error("uhoh something went wrong");
      console.error(err);
      res.send("error on querying images");

    } else {

      //console.log(photos);
      templateData = {
        title : 'SkullSpiration',
        photos : photos
        }

		if (req.user) {
		      // res.json({ username: req.user.username, email: req.user.email });
		      templateData["currentUser"] = req.user.username;
		    } else {
		      //console.log('user is anon');
		    }

 

      res.render("inspired.html", templateData);

    }
  })
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
	var deleteThis = req.body.deleteThis;

	// prep form
	var updatedData = {
		candles : req.body.candles,
		layout : false
	}

	console.log('begin updating skull');

	if (deleteThis === 'true'){
		console.log('so you want me to delete this guy : '+ skull_slug);
		skullModel.remove({slug:skull_slug}, function(err){
			if (err){
				console.log('error removing '+ skull_slug);
			} 
		});

	}

	// get this skull
	skullModel.update({slug:skull_slug}, { $set: updatedData }, function(err, skull){

		if (err) {
			console.log('error on update');
		}

		if (skull != null){
			res.redirect('/skulls/'+skull_slug);{
		}
			
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


exports.irlskullForm = function(req,res){
		var templateData ={
			status: "OK",
		}

	res.render('irlskull.html', templateData); 
}


exports.new_irlskull = function(req, res){

  // Get File upload information  
  var filename = req.files.image.filename; // actual filename of file
  var path = req.files.image.path; //will be put into a temp directory
  var mimeType = req.files.image.type; // image/jpeg or actual mime type


  // Create a new blog post
  var photoPost = new Photo(); // create Blog object
  photoPost.title = req.body.title;
  photoPost.urltitle = req.body.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_')
  photoPost.caption = req.body.caption;
  
  // any file upload?
  console.log("about to upload")

  // 2) create file name with logged in user id + cleaned up existing file name. function defined below.
  cleanedFileName = cleanFileName(filename);

  // 3a) We first need to open and read the image upload into a buffer
  fs.readFile(path, function(err, file_buffer){

    // pick the Amazon S3 Bucket
    var s3bucket = new AWS.S3({params: {Bucket: 'skullsIRL'}});
    
    // Set the bucket object properties
    // Key == filename
    // Body == contents of file
    // ACL == Should it be public? Private?
    // ContentType == MimeType of file ie. image/jpeg.
    var params = {
      Key: cleanedFileName,
      Body: file_buffer,
      ACL: 'public-read',
      ContentType: mimeType
    };
    
    // Put the Object in the Bucket
    s3bucket.putObject(params, function(err, data) {
      if (err) {
        console.log(err)

      } else {
        console.log("Successfully uploaded data to s3 bucket");

        // add image to blog post
        photoPost.image = cleanedFileName;
      }

      photoPost.save();

      res.redirect('/');

    });

  });

}

exports.photoAdmin = function(req, res){


		Photo.find({}, 'image', function(err, allPhotos) {

		if (err) {
			console.error("error on finding photos for admin display");
			console.error(err);
		}
		if (allPhotos == null) {
			console.log("no photos, sorry");
		} else {
			console.log("found some photos");

				var templateData = {
				photos : allPhotos
				}
			res.render('photoAdmin.html', templateData); 
			}

		});

	}


exports.photoEdit = function(req,res){

	var photo_id = req.params.photo_id;

	console.log('the photo to be deleted is ' + photo_id);

	Photo.findById(photo_id,function(err,photo){

		console.log('grabbed image named : '+ photo.title);

		if (err){
			console.error(err);
			res.send("unable to find this picture");
		} else {
			s3.client.deleteObject({Bucket: 'skullsIRL', Key: photo.image}, function(err,data){
				console.log(err,data);
				photo.remove(function(err){
					if (err) {
						console.error("error removing image from mongoDb");
						res.send('unable to remove photo from mogngo');
					}
					res.redirect('/inspired');
				})
			});
		}

	});

}

var cleanFileName = function(filename) {

    fileParts = filename.split(".");
    
    //get the file extension
    fileExtension = fileParts[fileParts.length-1]; //get last part of file
    
    //add time string to make filename a little more random
    d = new Date();
    timeStr = d.getTime();
    
    //name without extension "My Pet Dog"
    newFileName = fileParts[0];
    
    return newFilename = timeStr + "_" + fileParts[0].toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'_') + "." + fileExtension;
    
};



