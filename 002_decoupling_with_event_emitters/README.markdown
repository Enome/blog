2012-02-25 Use event emitters to decouple parts in your express.js application.
===============================================================================

## The wrong way.

One of the "mistakes" I did when I first started using express.js was to directly call the external parts of my application. Lets say you have a data layer for creating documents in a document database. What you could do, is import the module and start calling it directly.

``` js
var db = require('database');

db.create({ username: 'James', password: 1234 }, function(){
  
  //do stuff when document is created

});
```

## The right way

A better way would be to make an event emitter that acts as a layer between the moving parts of your application. Lets take the example from above. First you need to adjust your database library so that it can listen to events. If you are using a 3rd party library you can put a wrapper around it.

``` js
//database.js

var db = require('library');

exports.init = function(eventEmitter){

  eventEmitter.on('create document', function(document, callback){

    db.create(documents, function(){
      callback()
    });

  });

};
```

## The right right way

I made the listener really verbose to make it easier to understand. Since the event takes the same arguments as the db.create method, you write:

``` js
//database.js

var db = require('library');

exports.init = function(eventEmitter){

  eventEmitter.on('create document', db.create);

};
```

### Scumbag event emitter

One extra thing that can cause some annoyances when using events is that the node.js event emitter will change the value of "this" in your event. You can fix this by binding the method to the object again.


``` js
//database.js

var db = require('library');

exports.init = function(eventEmitter){

  eventEmitter.on('create document', db.create.bind(db));

};
```

## The Event Emitter

Next you need to have an actual event emitter object. For my projects I create a file called events.js with the following code:

``` js
//events.js

var EventEmitter = require('events').EventEmitter
module.exports = new EventEmitter()
```

## Connecting it

You now have an event emitter and a module with a listener but you still need to connect both parts. You may have noticed that my database library is inside an init function. I use this function to inject the event emitter into my module. You could just import the event.js module directly or you could use a global variable if you don't mind that. I like doing it this way so I have a list of all the modules that listen to events.

To connect it I am using the same technique that I talked about in my previous [blog post](https://github.com/Enome/blog/blob/master/001_structuring_express_js_applications/example_app/app.js#L15) 
to register routes.  When I wrote that, I thought 'Wow, this is great but where does it all come together?'. The answer is: in the app.js file. I register routes in my app.js. You can use the same to technique to register events.

``` js
//app.js

//First you need your global event emitter.
var eventEmitter = require('./events');

//Inject the emitter into the module.
require('database').init(eventEmitter);

//You can use this to register as many listeners as you like.
require('search-index').init(eventEmitter);
require('email-service').init(eventEmitter);
...
```

## Calling an event

Now lets create a document inside a route handler (middleware, it's all middleware).

``` js
//app.js

app.get( '/users', function(req, res, next){

  eventEmitter.emit('create document', { username: 'Geert', password: 1234 }, function(){

    //do stuff when document is created

  });

});
```

This handler is actually saying "Somebody, create me a document! I don't really care who but when it's done call me back". The handler only wants to be called back so you could have anything listening to that event. You could switch out your database.js file with something else as long as you have an event listening for 'create document'.

##Is there any downside of using events?

There are a few and the first one you'll run into is that you sometimes don't know if something is actually listening to an event. What I did to solve this was to wrap my event emitter with a function that just does 'console.log' when an event is registered and when an event is called. 

You also have to write a little more code to connect everything. This can be annoying especially in small modules. So I have this rule that inter library communication can be done directly but any communication to the outside world has to pass through the command tower (aka the event emitter).

##Bonus Material

Event emitters also make testing a lot easier because it limits dependencies. It gets even more exciting when for example you don't want to talk to a real database but use a fake.


``` js

beforeEach(function(){

  require('fakedatabase').init(eventEmitter);
  require('emailservice').init(eventEmitter);

});
```

You just have to make sure that your fake database listens to the same events as your real one.


That's all I have on event emitters. Another interesting blog post can be found on the (pragmatic programmers website)[http://pragprog.com/magazines/2011-08/decouple-your-apps-with-eventdriven-coffeescript]. He uses a global instead of injecting the emitter. He also points out how using events limits dependencies. You can also use this technique for (large client side apps)[http://addyosmani.com/scalable-javascript-videos/]. On that website they talk about decoupling large applications with the combination of events and other patterns. To be honest I didn't full understand it, but it sure looks impressive.
