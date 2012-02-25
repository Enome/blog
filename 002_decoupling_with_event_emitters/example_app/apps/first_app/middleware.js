var eventEmitter = require('../../events');

exports.first = function(req, res, next){

  eventEmitter.emit('create document', { username: 'Geert', password: 1234 }, function(){

    res.send('Inside the callback');

  });

};
