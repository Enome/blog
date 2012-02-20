exports.second = function(req, res, next){

    res.send('Hello, from second app');

};

exports.second_again = function(req, res, next){

    res.send('Hello again, from second app');

};
