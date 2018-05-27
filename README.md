# Building Web Applications with Node.js and Express 4.0

https://app.pluralsight.com/player?course=nodejs-express-web-applications-update&author=jonathan-mills&name=3b5a5eb2-d13c-43e4-bfe1-015f98659a97&clip=0&mode=live

You can view Javascript and ES6 here: https://github.com/wenbert/es6

## Building web apps
* From the beginning
* Node and NPM
* Templating Engines
* NPM Scripts
* Routing
* Databases
  * Mongo
  * SQL Server
* Consuming APIs

Node.js
* server side
* Electron
* Open Source

## Installing Node
 Use NVM: https://github.com/creationix/nvm

## NPM Versioning
`^4.13.3` the caret means that it will auto-update when a new version comes out (?)

`~4.13.x` auto-updates to minor version only

`4.13.3` no update.

## First Page
### Set up express
```
$ npm init
$ npm install --save express
```

In `app.js`:
```javascript
var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send('Hello from my library app');
});

app.listen(3000, function() {
    console.log('listenint on port 3000');
});
```

### Running express

```
$  node app.js
listenint on port 3000
```

Go the http://localhost:3000/

You should see:
```
Hello from my library app
```

### Logging and Debugging
```
$ npm install debug --save
```

In `app.js` add the following lines:
```javascript
var debug = require('debug')('app'); // app is the express app
```
Then if you want to use debug:
```javascript
//console.log(`listening on port ${chalk.green(3000)}`);
debug(`listening on port ${chalk.green(3000)}`);
```

To run and show all debug messages:
```
$ DEBUG=* node app.js
```

If you want, you can just show do this:
```
$ DEBUG=app node app.js
```

Then you should see a couple of debug messages.

Next we install `morgan`. 

```
$ npm install morgan --save
```

Then add to `app.js`

```javascript
var morgan = require('morgan');
//...
app.use(morgan('combined')); // This is a middleware
```

Then run `$ DEBUG=app node app.js` again and go to http://localhost:3000 and you'll see HTTP logs.

### Serving HTML
Create a file in: `views/index.html`
```html
<html>
    <body>
        Serving up HTML
    </body>
</html>
```

And you just use `sendFile()`. The `__dirname` indicates the current running directory of the current app.
```javascript
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
```

Now, with the paths, most systems will have a slash `/`. But for Windows, we would have a backslash `\`. So to go around this, we use `path` package. (NO need to `npm istall` this)
```javascript
//app.js
var path = require('path');

res.sendFile(path.join(__dirname, 'views/index.html'));
// or
res.sendFile(path.join(__dirname, 'views', 'index.html'));
```

### Serving static files
* Bootstrap
* jQuery
* Node Modules

Bootstrap template just copy-pasted from: https://getbootstrap.com/docs/4.1/getting-started/introduction/#starter-template

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <div class="container">
        <div class="jumbotron">
            Hello, world!
        </div>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
  </body>
</html>
```

Now, let serve files from our own server.

Create a directory called `public`. And inside that, create both `css` and `js`.
```
/public
- /css
- /js
```

Then in `app.js` add this to tell Express that we are serving static files from that location.
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

Now you would include files in your HTML using something like this:
```html
<link rel="stylesheet" href="/css/bootstrap.min.css">
...
<script src="/js/bootstrap.min.js"></script>
```

Now, we could download each one of those files. But we'd rather be using NPM.

So...
```
$ npm install bootstrap jquery popper.js --save
```

Now that would install those libraries into `node_modules`. Now believe it or not, we just copy those manually to the `public/css` and `public/js` folders. Copy the `node_modules/bootstrap/dist`  and `node_modules/jquery/dist`.

But that doesn't make sense. Because we would have to copy dependencies. For example, `popper`. WTF.

Okay, phew. Tutorials actually cover this. So delete everything in `public/css` and `public/js`.

Can you guess what we are about to do? Well, in `app.js` remember we served static files from `public` folder? We do a similar thing.

```javascript
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));
```

So now we have static files served from our own directory!