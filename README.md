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
    console.log('listening on port 3000');
});
```

### Running express

```
$  node app.js
listening on port 3000
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

With the paths, most systems will have a slash `/`. But for Windows, we would have a backslash `\`. So to go around this, we use `path` package. (NO need to `npm istall` this)
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

Let serve files from our own server.

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

We could download each one of those files. But we'd rather be using NPM.

So...
```
$ npm install bootstrap jquery popper.js --save
```

That would install those libraries into `node_modules`. Believe it or not, we just copy those manually to the `public/css` and `public/js` folders. Copy the `node_modules/bootstrap/dist`  and `node_modules/jquery/dist`.

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
And the `index.html` would look like this:
```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">

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
    <script src="/js/jquery.slim.min.js"></script>
    <script src="/js/popper.js"></script>
    <script src="/js/bootstrap.min.js"></script>
  </body>
</html>
```

So we have static files served from our own directory!

Next steps, we setup the Tooling. For example, we have to restart everytime we change something.

## Tooling

### NPM start
Instead of constantly running `$ DEBUG=app node app.js`, we setup in `package.json` in the `scripts` section.

```json
"scripts": {
    "start": "DEBUG=app node app.js", //<-- Add that!
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Then in your CLI, just do: `$ npm start`

### ESLint
Static code analysis.

Airbnb Style Guide?

Run: `$ npm install eslint --save-dev` to install

Then:
```
$ ./node_modules/.bin/eslint --init
? How would you like to configure ESLint? Use a popular style guide
? Which style guide do you want to follow? Airbnb
? Do you use React? No
? What format do you want your config file to be in? JavaScript
```

When that's done, just run: `$ npm run lint`.

#### Installing ESLint for Visual Studio Code
To install with VSCode, open `View` > `Extensions` and look for `ESLint by Dirk Baeumer`. Once you reload, you should see some code notices/messages in your Javascript files.

#### Refactoring Tips in VS Code
Multi-select occurrences of a text in a file.
* Double-click a text
* `Selection` > `Select All Occurrences`
* Modify text.

Also right-click anywhere in the code without highlighting anything and then select `Format Document`.

You can also use `eslint` to fix a file. Run: `$ ./node_modules/.bin/eslint --fix app.js`

### ES6 and beyond
https://node.green

### Nodemon
http://nodemon.io/

> Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. 

Install: `$ npm install nodemon --save`

Modify `package.json` start to use `nodemon` and add the `nodemonConfig` (maybe after `devDependencies`)
```json
...
  "scripts": {
    "start": "DEBUG=app nodemon app.js",
    "lint": "eslint app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
... snip ...
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.12.0"
  },
  "nodemonConfig": {
    "restartable":"rs",
    "ignore": ["node_modules/**/node_modules"],
    "delay": "2500"
  }
...
```

Then run `$ npm start`.

```
$ npm start

> library@1.0.0 start /Users/wenbert/dev/nodejs-express/library
> DEBUG=app nodemon app.js

[nodemon] 1.17.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node app.js`
  app listening on port 3000 +0ms
```

Try to modify a file, then 2.5 seconds later, it restarts. 

### Environmental variables

At the moment, we hard-coded port 3000 in `app.js`. That's not really recommended. So we add an `env` option in `nodemonConfig`.

`package.json` in `nodemonConfig` should like like this now;
```json
...
  "nodemonConfig": {
    "restartable":"rs",
    "ignore": ["node_modules/**/node_modules"],
    "delay": "2500",
    "env": {
      "NODE_ENV": "development",
      "PORT": 4000
    }
  }
...
```

So to use that new config, we open up `app.js` and do something like this:

```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
```

Now, need to restart. After doing so, you'll notice that you are now listening on port 4000.

## Templating Engines

### Pug
Formerly known as Jade.

If you want to use this open up `app.js`:
```javascript
app.set('views', './src/views');
app.set('view engine', 'pug');
```
So create the directories: `./src/views` 

Woops, almost forgot to install it. `$ npm install pug --save`

Create a new file `./src/views/index.pug` with the contents:
```pug
html
    head
        title MyApp
    body
        h1 My App
        p 
            h3 a sub header
```

In `app.js`, instead of doing a `res.sendFile()`, we do a `res.render()`

```javascript
//res.sendFile(path.join(__dirname, 'views/index.html'));
res.render('index');
```

Go to http://localhost:4000/. You should see the HTML file created in `index.pug`

### EJS
