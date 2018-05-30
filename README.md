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

#### Passing variables / objects to the template
In `app.js`, let's say we want to pass a title variable to the `index.pug` template.
```javascript
app.get('/', (req, res) => {
  res.render('index', { title: 'MyLibrary', letters: ['a', 'b', 'c'] });
});
```
Note that `{ title: 'MyLibrary', letters: ['a', 'b', 'c'] }` is an object. And `letters` is an array inside that object.

In `index.pug` wewe would have `title` displayed as `h1(id='MyId')=title`. See below:
```pug
html
    head
        title MyApp
    body(class=["myClass"])
        h1(id='MyId')=title
        p 
            h3 a sub header
        ul
            each val in letters
                li=val
```
Refresh your browser, and you should see "MyLibrary" in the H1. And the letters: a, b, and c in a list.

### EJS

In `app.js`, modify the part where you set the template engine.
```javascript
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
```

Run `$ npm install ejs --save`.

Then rename `index.pug` to `index.ejs`. Modify its contents to have something like this:
```html
<html>
    <head>
    </head>
    <body>
        <h1>Welcome to <%=title%></h1>
        <ul>
            <%for (var i = 0; i < letters.length; i++) {%>
                <li><%=letters[i]%></li>
            <%}%>
        </ul>
    </body>
</html>
```
You can also install an extension `.ejs` by searching for `EJS` in the `Extensions` section for VSCode. This will enable syntax highlighting when editing .ejs files.

### Templates

The tutorial uses some custom Bootstrap theme. I find that unnecessary. For this one, let's just use the default Bootstrap CSS.

The `index.ejs` file should more or less look like this one:
```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/css/bootstrap.min.css">

    <title><%=title%></title>
  </head>
  <body>
    <div class="container">
        <h1>
            <%=title%>
        </h1>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="/js/jquery.slim.min.js"></script>
    <script src="/js/popper.js"></script>
    <script src="/js/bootstrap.min.js"></script>
  </body>
</html>
```

Next chapters, we'll see some routing, databases, authentication, etc.

## Routing
* Building a Web Application
* Build Routes for Our Application
* Separating Files
* Parameter Variables
* Router Functions

### Navigation
For now, we are only doing the index part of our application.
```javascript
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'MyLibrary',
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' },
      ],
    },
  );
});
```
So here, we are passing in an array of objects for the navigation.
And the corresponding loop for this in `index.ejs` is:
```html
<div class="navbar-nav">
<%for (var i = 0; i < nav.length; i++) {%>
    <a class="nav-item nav-link" href="<%=nav[i].link%>"><%=nav[i].title%></a>
<%}%>
</div>
```

Now the next question would be what do we do with the `/books` and `/authors`?

Well we can manually add in `app.js` another `app.get()` for `books`. But do we want to do it like that for every route/link we have?

Of course not. That would clutter up pretty quickly. What we should be doing is use a "router".

Now open `app.js` and add something like this:
```javascript
const bookRouter = express.Router();

// A
bookRouter.route('/')
  .get((req, res) => {
    res.send('hello books');
  });
// That .get() is the same .get() from the index

// Another one

// B
bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

// C
app.use('/books', bookRouter);
```
The code above is saying that `C` has `/books` with `bookRouter`.
And that `A`, is the main bookRouter. So anything in `http://localhost:4000/books` would fall into `A`.
And then `B` is under `A` (main bookRouter), so anything in `http://localhost:4000/books/single` would use `B`

So now, these links would work:
* http://localhost:4000/books
* http://localhost:4000/books/single

### Separating Files
Our `app.js` is starting to get bloated. At the moment, we have all the routes, required `const` variables, etc. all in one file. Let's start to separate out files a bit.

Create a directory name `routes` inside `src`.

Then create this file: `./src/routes/bookRouter.js`:
```javascript
const express = require('express');
const bookRouter = express.Router();

const books = [
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false,
  },
  ...
];

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        title: 'MyLibrary',
        nav,
        books,
      },
    );
  });

bookRouter.route('/single')
  .get((req, res) => {
    res.render('hello single book');
  });

module.exports = bookRouter;

```
This here is an isolated router file. Don't forget to export the `bookRouter` at the end.

Then in `apps.js` it would just be a matter of using `require` for the file.

```javascript
const bookRouter = require('./src/routes/bookRoutes');

app.use('/books', bookRouter);

```

### Passing parameters in routes
This part is for the `single` books. ie: When you click on a link for the books list. We pass in the `id` in the URL, the router receives it, then so on.

The `booksRoute.js` would have something like this now:
```javascript
const express = require('express');

const bookRouter = express.Router();

const books = [
    {
      title: 'The Time Machine', genre: 'Science Fiction', author: 'H. G. Wells', read: false,
    },
    {
      title: 'The Dark World', genre: 'Fantasy', author: 'Henry Kuttner', read: false,
    },
  ];

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        title: 'MyLibrary',
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' },
        ],
        books,
      },
    );
  });

// bookRouter.route('/single')
//   .get((req, res) => {
//     res.render('hello single book');
//   });
bookRouter.route('/:id')
  .get((req, res) => {
    // We can do this, but ESLint advices us to use
    // const id = req.params.id;
    const { id } = req.params;
    res.render(
      'book',
      {
        title: 'MyLibrary',
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' },
        ],
        book: books[id],
      },

    );
  });

module.exports = bookRouter;

```
`:id` is anything `/books/123`, `/books/456`. It will become available in `req.params.id`.

We end up using: `const { id } = req.params;` because we want to use "destructuring". See https://github.com/wenbert/es6/blob/master/rapid-es6-training/README.md#destructuring.

Next is to create the template/view file. Create a new file `./src/views/book.ejs`.
```html
<h1>
    <%=book.title%>
</h1>
<p>
    Author: <%=book.author%><br/>
    Genre: <%=book.genre%>
</p>
```

Now, when you click on the books list, you should see the "book details".

### Routing Functions
As of this time, we are copy-pasting the `nav` variable in the main router and in `bookRouter`. We need to fix that. 

To do this, we need to pass `nav` to `bookRouter`. Open `app.js` and modify it to contain this:
```javascript
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];

const bookRouter = require('./src/routes/bookRoutes')(nav);
```
In Javascript, what we're doing in `require('./src/routes/bookRoutes')(nav)` we are actually calling that line as a function. So we are passing `nav` as a parameter.

We obviously need to change `bookRouter.js` so that it becomes a function.

```javascript
const express = require('express');

const bookRouter = express.Router();

// The function!
function router(nav) {
  const books = [
    {
      title: 'The Time Machine', genre: 'Science Fiction', author: 'H. G. Wells', read: false,
    },
    {
      title: 'The Dark World', genre: 'Fantasy', author: 'Henry Kuttner', read: false,
    },
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render(
        'books',
        {
          title: 'MyLibrary',
          nav,
          books,
        },
      );
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render(
        'book',
        {
          title: 'MyLibrary',
          nav: [
            { link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' },
          ],
          book: books[id],
        },

      );
    });
  // Make sure we return this.
  return bookRouter;
}

// Then use `router` to export
module.exports = router;

```

## Databases
We are still using the `books` array. Next we tackle databases. 
