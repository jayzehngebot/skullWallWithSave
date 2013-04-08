
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

// the ExpressJS App
var app = express();

// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 5000);

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
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // database - skipping until week 5
  app.db = mongoose.connect(process.env.MONGOLAB_URI);
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// ROUTES
var routes = require('./routes/index.js');
app.get('/', routes.index);

app.get('/draw', routes.makeDrawing);
app.post('/draw', routes.postDrawing);
app.get('/done', routes.done);
app.get('/inspired', routes.inspired);
app.get('/data', routes.data);
app.get('/api', routes.remote_api);


app.get('/skulls/:skull_slug/data', routes.skullData);
app.get('/skulls/:skull_slug', routes.skullDetail);
app.post('/skulls/:skull_slug/edit', routes.updateSkull);

app.get('/adminsec', routes.adminsecGet);
app.post('/adminsec', routes.adminsecPost);

//app.post('/',routes.postlibs); //form POST submits here
//app.get('/astronauts/:astro_id', routes.detail);
// create NodeJS HTTP server using 'app'

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
