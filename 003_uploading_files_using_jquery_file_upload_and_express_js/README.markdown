# 2012-04-03 Uploading images using jQuery File Upload and Express.js

The goal is to have a web page that lets you create a product with multiple images associated. We will be using JavaScript to asynchronously upload the files to the back-end. The back-end will return these images to the front-end which in turn will show a preview. 

Google Chrome: 18, Firefox: 11.0, Safari: 5.1.5, Internet Explorer: 9.0.8 are the browser I tested.

## Form

``` jade
form
  p
    label Product Name:
      input( type='text', name='product' )

  p
    label Images:
      input#FileUpload(type='file', name='image', multiple)

  p.images
``` 
Please note that IE9 doesn't support multiple. The way we are building our app you will still be able to associate multiple files to your product but it will take extra clicks.

## Including the JavaScript files

For the [basic example](https://github.com/blueimp/jQuery-File-Upload/wiki/Basic-plugin) you need to include the files below. You can find the files on Github by either [cloning](https://github.com/blueimp/jQuery-File-Upload) the source code or [downloading](https://github.com/blueimp/jQuery-File-Upload/downloads) the zip. Also add a main.js file to public/javascripts to setup the plugin.

Your view should look like this:

``` jade
script(src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js")
script(src="/javascripts/jquery.ui.widget.js")
script(src="/javascripts/jquery.iframe-transport.js")
script(src="/javascripts/jquery.fileupload.js")
script(src="/javascripts/main.js")
```

## Upload Route

First we create an Express.js route that will handle the uploaded files.

```js
app.post('/upload', function(req, res, next){

  storage(req.files.image, function(data){
    var contentType = req.headers.accept.indexOf('application/json') !== -1 ? 'application/json' : 'text/plain';
    res.header('Content-Type', contentType);
    res.send(JSON.stringify(data));
  });

});
```

The reason why you need to set the Content-Type header can be found on the [plugin page](https://github.com/blueimp/jQuery-File-Upload/wiki/Setup) (scroll down).  The TL;DR version: IE9 uses an iframe so you need to set the Content-type header to text/plain' or you get a nasty download dialog.

## Storage Api

You will also need to define a storage function. This is optional and you can handle the uploaded files in the route. In my own projects I would use an event emitter to decouple the storage api.

```js
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
```

We rename and move the file from ~/tmp to /public/media so that we can serve it back to the front-end.

We then give the file a uuid name so we don't have to worry about files overwriting each other. I wasn't sure if it was okay to remove the extension from a file but Stackoverflow seems to confirm it [here](http://stackoverflow.com/questions/5110384/can-i-use-images-without-extension-in-img) and [here](http://stackoverflow.com/questions/3463952/is-it-safe-to-serve-an-image-on-the-web-without-an-extension).

Don't forget to create a media directory inside /public and make sure you installed node-uuid for generating the file name.

## Configuring jQuery File Upload

The back-end will return the uploaded images to the plugin once they are uploaded and moved them into the public/media directory. The front-end will then adds these images to the page to preview them and also add input fields to the form with the urls. That way you post the product data along with the image urls to the back-end. 

```js
$('#FileUpload').fileupload({
  url: '/upload',
  dataType: 'json',
  done: function (e, data) {

    var result = data.result;

    $.each(result, function (index, file) {

      var p = $('<img/>').attr('src', file.url);
      $('p.images').append(p);

      var input = $('<input type="hidden" />').attr('name', 'images[]').val(file.url);
      $('p.images').append(input);

    });
  }
});
```

Next you need to write a route that can handle the product data you post. I'll leave this out since you probably need to customize it anyway to fit your needs. If you need some inspiration the plugin comes with a few examples and there is a pure Node.js example included. You most likely want to validate the file types and resize the images.

## Bonus material

If you have to make a private back-end for a client and you know or can force them to use either Chrome or Firefox then you can add the following code to the plugin setup.

```js
add: function(e, data){
  var resized = $(this).fileupload('resize', {
    files: data.files,
    resizeSourceMaxFileSize: 10000000,
    resizeMaxWidth: 400,
    resizeMaxHeight: 300,
    resizeMinWidth: 400,
    resizeMinHeight: 300
  });

  resized.done( function(){ data.submit() } );
}
```

This will resize the images before they are being uploaded. Which is great for non technical administrators. You will need to include some extra files.

```jade
script(src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js")
script(src="/javascript/jquery.ui.widget.js")
script(src="/javascript/jquery.iframe-transport.js")
script(src="http://blueimp.github.com/JavaScript-Load-Image/load-image.min.js")
script(src="http://blueimp.github.com/JavaScript-Canvas-to-Blob/canvas-to-blob.min.js")
script(src="/javascript/jquery.fileupload.js")
script(src="/javascript/jquery.fileupload-ip.js")
script(src="/javascript/main.js")
```

While almost finishing this post I got my [HTML5 Weekly](http://html5weekly.com/archive/32.html) which has a link to [HTML5 Doctor](http://html5doctor.com/drag-and-drop-to-server/?utm_source=html5weekly&utm_medium=email) with tons of info about drag and drop and uploading files.

## Source code

The code for this app can be found inside this directory. npm install and node app.js should be enough to run it.

## Comments

If you run into problems or just want to say something you can do that [here](https://github.com/Enome/blog/issues/3).
