var storage = require('../lib/storage');

module.exports = function( app ){

  app.get('/', function( req, res ){

    res.render('index');

  });

  app.post('/upload', function(req, res, next){

    storage(req.files.image, function(data){
      var contentType = req.headers.accept.indexOf('application/json') !== -1 ? 'application/json' : 'text/plain';
      res.header('Content-Type', contentType);
      res.send(JSON.stringify(data));
    });

  });

};
