var middleware = require('./middleware');

module.exports = function(app){
  
  app.get('/hello-first', middleware.first)

};
