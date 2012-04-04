var uuid = require('node-uuid');
var fs = require('fs');

module.exports = function(file, callback){

  var name = uuid.v1();
  var path = __dirname + '/../public/media/' + name;
  var url = '/media/' + name;

  fs.rename(file.path, path, function(err){

    if( err ) throw err;

    return callback([{ name: file.name, path: path, url: url }]);
             
  });

};
