#2012-02-20 Structuring an Express.js application

After using Express.js for a few weeks I am reaching a point where I don't completely hate my current project structure. Most examples on the web will just put everything in the app.js and that's fine for really small applications but when you need something bigger, you have to organise your code in blocks that make sense.

There are many ways to approach this and first I thought of going for a Rails like structure but that didn't work out. The main problem was that Express.js is made out of middleware and having a controllers directory/file with middleware code was a bit confusing.

After Rails I went for a Django structure because I like the idea of each app being a single entity in my application. This of course is a total lie and apps will mostly spill over into each other but it's something nice to aim for. The Django style of apps actually worked very well for me and I stuck with it.

Since code says more than words you can find an example of how I structure in this directory. ( Look up )

You can discuss this post over [here](https://github.com/Enome/blog/issues/1).
