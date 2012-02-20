var middleware = require('./middleware');

module.exports = function(app){
  
  app.get('/hello-second', middleware.second)
  app.get('/hello-second-again', middleware.second_again)

};
