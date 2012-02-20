var middleware = require('./middleware');

module.exports = function(app){
  
  app.get('/hello-first', middleware.first)
  app.get('/hello-first-again', middleware.first_again)

};
