2012-04-05 Are library such as Knockout.js and Ember.js useful for normal websites?
=====================================================================================

## Intro

As an experiment I am going to try and ask a question on this blog. All the info I get or find will be added to this post so it can be useful to others.

## The question

When I use something like Knockout.js or Ember.js it works great for web apps but for CRUD websites it tends to get complex fast.

For example lets say you have a user object that can have unlimited telephone numbers. Without JavaScript you will most likely make CRUD pages for the numbers and users. The users will then have a select box to select the numbers. This works fine but you can improve it by having one form with the user data and some JavaScript that lets you add more input fields. 

With libraries like Knockout and Ember this is easy to make since the UI is bound to the data. So all you have to do is add an extra empty phone number object to the array of numbers and the UI will update it self.

For the C in crud this isn't so bad. The html will contain real input fields so the data will be send to the server when you post the form. 

It gets a lot more complicated for updating the user. In a static update page you would just use your server-side template language to render an input field for each number. You can't do this for KO.js or Ember.js, since the UI is linked to the data. So I mostly end up with a hidden input field with the ID of the user. Then on document ready JavaScript will grab the id and make an ajax call to the back-end to get the JSON data for that user. I will then use that data to populate the model which in turn will sync the html so that it renders all the phone numbers.

If I would only use jQuery I could just let the server render all the phone numbers and add a 'jQuery layer' on top. jQuery would then be responsible for adding or removing the number fields. This works but it also has a lot of downsides. For example a viewmodel is a lot easier to test then the jQuery solution. Manually adding or removing the fields to the html with jQuery can be cumbersome. 

So got a blog post or a library that deals with this problem? Does this problem have a name that would make it easier for me to Google? Let me know on twitter [(@enome)](https://twitter.com/Enome) or in the [comments](https://github.com/Enome/blog/issues/4).
