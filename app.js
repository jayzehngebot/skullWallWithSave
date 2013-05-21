
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mongoStore = require('connect-mongodb')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , AnonymousStrategy = require('passport-anonymous').Strategy;

// ExpressJS
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

    // MongoDB
  app.db = mongoose.connect(process.env.MONGOLAB_URI, {db:{safe:false}});

  //  Set templates for 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  // the most important thing. Favicon handler
  app.use(express.favicon());

  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

});

// TURN ON COOKIES
app.use(express.cookieParser(process.env.COOKIEHASH));

// STORE SESSION IN MONGODB
// mongoStore for session storage is using the connect-mongodb module
app.use(express.session({ 
    store: new mongoStore({url:process.env.MONGOLAB_URI}),
    maxAge: 300000,
    secret: process.env.COOKIEHASH
  })
);

// TURN ON PASSPORT AUTHENTICATION MODULE
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// PREPARE User module - set up models
var User = require('./models/user.js');

// Configure passport to use Passport Local strategy
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ADD ANON STRATEGY
passport.use(new AnonymousStrategy());

// ROUTES
var routes = require('./routes/index.js');
var account = require('./routes/accounts.js');

// INDEX
app.get('/', passport.authenticate(['local','anonymous']), routes.index);

// THE TRIUMVERATE 
app.get('/draw', passport.authenticate(['local','anonymous']), routes.makeDrawing);
app.post('/draw', routes.postDrawing);
app.get('/done', routes.done);

// PURCHASE PAGE
app.get('/purchase', routes.purchase);

// EXPERIMENTAL TWO TOOL DRAWING
app.get('/drawTwo', routes.makeDrawingTwo);

// PHOTO BUCKET & INSPIRATION BOARD
app.get('/inspired', passport.authenticate(['local','anonymous']), routes.inspired);
app.get('/irlskull', routes.irlskullForm);
app.post('/irlskull', routes.new_irlskull);
app.get('/photoAdmin', account.ensureAuthenticated, routes.photoAdmin);
app.post('/photoAdmin/:photo_id/edit', routes.photoEdit);

// LOGIN
app.get('/login', account.login);
app.post('/login', passport.authenticate(['local','anonymous']), account.login_post);

// REGISTRATION
app.get('/register', account.register);
app.post('/register', account.register_post);
app.get('/success', account.ensureAuthenticated, routes.loginSuccess);
app.get('/logout', account.logout);


// EDIT INDIVIDUAL SKULL INFO 
app.get('/skulls/:skull_slug/data', routes.skullData);
app.get('/skulls/:skull_slug', routes.skullDetail);
app.post('/skulls/:skull_slug/edit', routes.updateSkull);

// RAW DATA AND API USAGE EXAMPLE
app.get('/data', routes.data);
app.get('/api', routes.remote_api);
  

// INIT SERVER
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

