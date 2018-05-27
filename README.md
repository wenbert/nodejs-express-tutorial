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
### Serving static files
* Bootstrap
* jQuery