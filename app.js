
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , mongoStore = require('connect-mongodb')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

    // database - skipping until week 5
  app.db = mongoose.connect(process.env.MONGOLAB_URI);


  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));

});


// TURN ON COOKIES
// COOKIEHASH in your .env file (must be available on heroku)
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

// ROUTES
var routes = require('./routes/index.js');
var account = require('./routes/accounts.js');


app.get('/', routes.index);

app.get('/draw', routes.makeDrawing);
app.post('/draw', routes.postDrawing);
app.get('/done', routes.done);
app.get('/inspired', routes.inspired);
app.get('/data', routes.data);
app.get('/api', routes.remote_api);

// login GET + POST
app.get('/login', account.login);
app.post('/login', passport.authenticate('local'), account.login_post);

// register GET + POST
app.get('/register', account.register);
app.post('/register', account.register_post);

app.get('/write', account.ensureAuthenticated, routes.userMakeDrawing);
app.post('/write', account.ensureAuthenticated, routes.postDrawing);

app.get('/skulls/:skull_slug/data', routes.skullData);
app.get('/skulls/:skull_slug', routes.skullDetail);
app.post('/skulls/:skull_slug/edit', routes.updateSkull);

app.get('/success', account.ensureAuthenticated, routes.loginSuccess);

app.get('/logout', account.logout);

app.get('/irlskull', routes.irlskullForm);
app.post('/irlskull', routes.new_irlskull);


// Turn server on
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

