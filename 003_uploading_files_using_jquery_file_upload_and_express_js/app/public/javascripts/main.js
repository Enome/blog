$(function () {
  jQuery('#FileUpload').fileupload({
    url: '/upload',
    dataType: 'json',
    done: function (e, data) {

      var result = data.result;

      $.each(result, function (index, file) {

        var p = $('<img/>').attr('src', file.url);
        $('p.images').append(p);

        var input = $('<input type="hidden"/>').attr('name', 'images[]').val(file.url);
        $('p.images').append(input);

      });

    },

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

  });

});
