# Helpers and dynamic helpers in Express.js 3.x

As you may or may not have noticed but in Express.js 3.x app.helpers and app.dynamicHelpers were removed. 

## Simple Helpers

For helpers that don't need req/res objects not much has changed. Instead of calling app.helpers you now use app.locals or res.locals.

Global helpers:

```js
app.locals.myHelper = function () {

};
```

Middleware specific helpers:

```js
var middleware = function (req, res, next) {
  res.locals.myHelper = function () {

  };
};
```

## Dynamic helpers

For helpers that need access to the req and res arguments.

```js
app.use(function (req, res, next) {

  res.locals.helpers = {

    first: function (path) {
      return req.url + path;
    }

  };

  next();

});
```

## Dynamic helpers with callbacks

Personally I would just prepare my data in middleware and pass that to the view.
