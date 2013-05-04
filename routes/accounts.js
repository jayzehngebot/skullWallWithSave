var moment = require("moment");
var passport = require("passport");

//models
var User = require('../models/user.js');


exports.ensureAuthenticated = function(req, res, next) {
    console.log("is Authenticated:" + req.isAuthenticated());
    
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
}

// Login display
exports.login = function(req, res) {
	templateData = {
		user:req.user,
	}

	res.render('accounts/login.html', templateData);
};

// Login post
exports.login_post = function(req, res) {
	res.redirect('/draw');
};

// logout
exports.logout = function(req, res) {
	req.logout();
    res.redirect('/');
};

exports.register = function(req, res) {
    res.render('accounts/register.html', { });
};

exports.register_post = function(req, res) {

	if (req.body.password != req.body.confirm) {
		return res.render('accounts/register.html');
	} else {

        User.register(new User({ username : req.body.username, email : req.body.email}), req.body.password, function(err, new_user) {
            if (err) {
                return res.render('accounts/register.html');
            }
            console.log("**********");
            console.log(new_user);
            res.redirect('/success');
        });
    }
};