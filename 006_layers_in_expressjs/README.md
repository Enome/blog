# Layers In Express.js

## Middleware

When you are using Express.js most of your code will be inside middleware. Middleware is a function that takes 3 parameters.

```js
function (request, response, next) {};
```

In other frameworks you have controllers which live at the end of the request/response chain. Middleware in those frameworks is used to add or remove stuff from request or response before it reaches the controller. Express.js doesn't have controllers it only has middleware.


## Control Flow

Middleware is also control flow. If you look at the middleware function it might look familiar if you used async.js serial before.


## app.use

For general middleware that gets executed on every request you want to use app.use. 

### Sub-apps

Did you know that you can break your app into many small apps?

```js
var express = require('express');
var app1 = express();
var app2 = express();
var app3 = express();

app1.use(app2);
app1.use(app3);
```

## route middleware

The router is actually middleware it self which can execute other middleware for a specific route.

```js
app.get('/', function (req, res, next));
app.get('/', function (req, res, next){ next(); }, function (req, res, next){ res.send('test')});

var array = [ function (req, res, next){ next(); }, function (req, res, next){ res.send('test') } ];
app.get('/', array);
```


