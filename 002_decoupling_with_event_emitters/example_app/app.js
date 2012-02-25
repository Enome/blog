var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Get the Emitter
var eventEmitter = require('./events');

// Events
require('./database_layer').init(eventEmitter);

// Routes
require('./apps/first_app/routes.js')(app)

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
