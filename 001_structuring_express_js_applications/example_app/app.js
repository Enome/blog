var express = require('express');

var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
require('./apps/first_app/routes.js')(app)
require('./apps/second_app/routes.js')(app)

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
