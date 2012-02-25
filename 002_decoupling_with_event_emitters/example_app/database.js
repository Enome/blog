exports.init = function(eventEmitter){

  eventEmitter.on('create document', function(document, callback){
    console.log('Created the following document', document);
    callback();
  });

};
