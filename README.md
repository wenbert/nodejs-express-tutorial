# What's this about?

This is my learning progress from: 
[PluralSight: Web Applications with Node.js and Express 4.0 (Update as of June 2018) by Jonathan Mills](https://app.pluralsight.com/player?course=nodejs-express-web-applications-update&author=jonathan-mills&name=3b5a5eb2-d13c-43e4-bfe1-015f98659a97&clip=0&mode=live).

Hopefully, this document will be a useful resource - not just for myself but for everyone. It will serve as some kind of cheatsheet to look-up when needed.

As a pre-requisite, it is recommended that you go through the previous PluralSight courses found in: [Learning Javascript and ES6 from PluralSight](https://github.com/wenbert/es6)

# What am I trying to accomplish?

1. Learn Javascript basics
1. Learn Node.js and/or Express for the back-end
1. Learn modern Javascript for the front-end
1. React native (?)

# Table of Contents
<!-- TOC -->

- [What's this about?](#whats-this-about)
- [What am I trying to accomplish?](#what-am-i-trying-to-accomplish)
- [Table of Contents](#table-of-contents)
    - [Building web apps](#building-web-apps)
    - [Installing Node](#installing-node)
    - [NPM Versioning](#npm-versioning)
    - [First Page](#first-page)
        - [Set up express](#set-up-express)
        - [Running express](#running-express)
        - [Logging and Debugging](#logging-and-debugging)
        - [Serving HTML](#serving-html)
        - [Serving static files](#serving-static-files)
    - [Tooling](#tooling)
        - [NPM start](#npm-start)
        - [ESLint](#eslint)
            - [Installing ESLint for Visual Studio Code](#installing-eslint-for-visual-studio-code)
            - [Refactoring Tips in VS Code](#refactoring-tips-in-vs-code)
        - [ES6 and beyond](#es6-and-beyond)
        - [Nodemon](#nodemon)
        - [Environmental variables](#environmental-variables)
    - [Templating Engines](#templating-engines)
        - [Pug](#pug)
            - [Passing variables / objects to the template](#passing-variables--objects-to-the-template)
        - [EJS](#ejs)
        - [Templates](#templates)
    - [Routing](#routing)
        - [Navigation](#navigation)
        - [Separating Files](#separating-files)
        - [Passing parameters in routes](#passing-parameters-in-routes)
        - [Routing Functions](#routing-functions)
    - [Databases](#databases)
        - [Middleware](#middleware)
    - [MongoDB](#mongodb)
        - [Admin Routes](#admin-routes)
    - [Authentication](#authentication)
    - [Passport](#passport)
        - [Authorising Users / Protecting routes](#authorising-users--protecting-routes)
    - [Structure and Third-party APIs](#structure-and-third-party-apis)
        - [Controllers](#controllers)
    - [API calls with Services](#api-calls-with-services)
        - [Making an actual API call](#making-an-actual-api-call)

<!-- /TOC -->

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
    "start": "DEBUG=app,app:* node app.js", //<-- Add that!
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

The Pluralsight tutorial uses Azure MSSql. I don't want to do that so let's replicate this using SQLite.

First, make sure you have SQLite installed on your machine. You can use Homebrew to do it. And then install sqlite3 with npm.

```
$ brew install sqlite
$ npm install sqlite3
```
That's it! You should now be able to use SQLite. 

An extra goodie, install https://sqlitebrowser.org/!

SQLite Browser is pretty self-explanatory. To start, create a new database file: `./db/library.db`. Then create `books` table. With the following fields: 
* id (auto-increment)
* title
* author

Use SQLite Browser to create sample records in the `books` table.

To test, in `app.js` add this.
```javascript
// source: http://www.sqlitetutorial.net/sqlite-nodejs/connect/
const sqlite3 = require('sqlite3').verbose();
 
// open the database
let db = new sqlite3.Database('./db/library.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
 
db.serialize(() => {
  db.each(`SELECT *
           FROM books`, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.title + "\t" + row.author);
  });
});
 
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
```

Run `$ npm start` and you should see something like:
```
Connected to the chinook database.
1       The Hobbit      JRR Tolkien
2       Harry Potter    JK Rowling
Close the database connection.
```

Let's apply this to `bookRoutes.js`. It should now look like:
```javascript
const express = require('express');
// const debug = require('debug')('app:bookRoutes');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/library.db');

const bookRouter = express.Router();

// The function!
function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const sql = 'SELECT * FROM books';
      db.all(sql, [], (err, results) => {
        res.render(
          'books',
          {
            title: 'MyLibrary',
            nav,
            books: results,
          },
        );
      });
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const sql = 'SELECT * FROM books WHERE id = ?';
      db.get(sql, [id], (err, result) => {
        res.render(
          'book',
          {
            title: 'MyLibrary',
            nav,
            book: result,
          },
        );
      });
    });
  return bookRouter;
}

module.exports = router;

```

`books.ejs` would have a slight modification: `<%=books[i].id%>` - because previously, we were displaying the index of the array and not the id in the table.
```html
<ul>
<%for (var i = 0; i < books.length; i++) {%>
    <li>
        <a class="nav-item nav-link" href="/books/<%=books[i].id%>">
            <%=books[i].title%>
            by (<%=books[i].author%>)
        </a>
    </li>
<%}%>
</ul>
```

Now, `bookRoutes.js` works. But that the old way of doing things. Using `.then()` is a Promise. We can get rid of those Promises and use `async/await`. But since we are using SQLite, I'm not sure how to do it yet. So I will put in how it looked like in the tutorial.

```javascript
// IFFY
(() {} ());
```
Then...
```javascript
function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
            books: result.recordset,
        const { recordset } = await request.query('SELECT * FROM books');
        // debug(result);
        res.render(
          'books',
          {
            title: 'MyLibrary',
            nav,
            books: recordset,
          },
        );
      }());
    });

    bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = 
          await request.input('id', sql.Int, id)
            .query('SELECT * FROM books WHERE id = @id');
        res.render(
          'books',
          {
            title: 'MyLibrary',
            nav,
            book: recordset[0],
          },
        );
      }());
    });
  return bookRouter;
}
```

### Middleware

Try this in `app.js`
```javascript
app.use((req, res, next) => {
  debug('My Middleware');
  next();
});
```
Now, when you restart `$ npm run`, you'll see that in the logs, the `My Middleware` is displayed after every request.

```
[nodemon] starting `node app.js`
  app listening on port 4000 +0ms
  app My Middleware +1s
GET /books/1 304 - - 18.018 ms
  app My Middleware +8s
GET /books/1 304 - - 2.582 ms
  app My Middleware +5s
GET /books/2 304 - - 1.034 ms
```

What this is used for is that I can interrupt the process flow and do whatever I want to do.


## MongoDB

I installed MongoDB using Homebrew: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

I created a directory in `/Users/wenbert/dev/mongodb_data`.

To run with custom path to data directory, use:
```
$ mongod --dbpath /Users/wenbert/dev
```

To start using MongoDB from CLI you can do:
```
$ mongo --host 127.0.0.1:27017
```

### Admin Routes

We are creating a Admin Routes that will handle the insertion of data to MongoDB for us.

This is a good oppotunity to create another router.

Create: `./src/routes/adminRoutes.js`:
```javascript
const express = require('express');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      res.send('inserting books');
    });
  return adminRouter;
}

module.exports = router;
```

Then add this is `app.js`:

```javascript
const adminRouter = require('./src/routes/adminRoutes.js')(nav);
app.use('/admin', adminRouter);
```

If you point your browser to: `http://localhost:4000/admin` you should get "inserting books".

Next step is to actually plug in MongoDB.

First step is to install the MongoDB Driver.

```
$ npm install mongodb
```

Then let's modify `adminRoutes.js` so that we can insert data into mongodb.

```javascript
const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
const adminRouter = express.Router();

const books = [
  {
    title: 'The Lord of the Rings',
    genre: 'Fantasy',
    author: 'Tolkien',
    read: false,
  },
  {
    title: 'Star Wars',
    genre: 'Sci-Fi',
    author: 'Lucas',
    read: false,
  },
];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongodb server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;

```

Go to: `http://localhost:4000/admin`

You should see this result:
```json
{
    "result": {
        "ok": 1,
        "n": 2
    },
    "ops": [
        {
            "title": "The Lord of the Rings",
            "genre": "Fantasy",
            "author": "Tolkien",
            "read": false,
            "_id": "5b13c93a131ed00f0bce0ae1"
        },
        {
            "title": "Star Wars",
            "genre": "Sci-Fi",
            "author": "Lucas",
            "read": false,
            "_id": "5b13c93a131ed00f0bce0ae2"
        }
    ],
    "insertedCount": 2,
    "insertedIds": {
        "0": "5b13c93a131ed00f0bce0ae1",
        "1": "5b13c93a131ed00f0bce0ae2"
    }
}
```

To check this you can go to the MongoDB CLI and do the following:
```
$ mongo --host 127.0.0.1:27017
MongoDB shell version v3.6.4
connecting to: mongodb://127.0.0.1:27017/
MongoDB server version: 3.6.4
Welcome to the MongoDB shell.
For interactive help, type "help".
...
> show dbs
admin       0.000GB
config      0.000GB
libraryApp  0.000GB
local       0.000GB
> use libraryApp
> db.books.find().pretty()
{
	"_id" : ObjectId("5b13c91030210c0f0217516f"),
	"title" : "The Lord of the Rings",
	"genre" : "Fantasy",
	"author" : "Tolkien",
	"read" : false
}
{
	"_id" : ObjectId("5b13c91030210c0f02175170"),
	"title" : "Star Wars",
	"genre" : "Sci-Fi",
	"author" : "Lucas",
	"read" : false
}
>
```

You can also use tools like https://robomongo.org/download to browse MongoDB collections.

Now to use MongoDB in `bookRoutes`, we update `bookRoutes.js` to look something like this:
```javascript
const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

// The function!
function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      /* For MongoDB: */
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      // IFFY
      // (() {} ());
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongodb server');

          const db = client.db(dbName);
          const collection = await db.collection('books');
          const books = await collection.find().toArray();

          res.render(
            'books',
            {
              title: 'MyLibrary',
              nav,
              books,
            },
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());

      /* For SQLite:
      const sql = 'SELECT * FROM books';
      db.all(sql, [], (err, result) => {
        res.render(
          'books',
          {
            title: 'MyLibrary',
            nav,
            books: result,
          },
        );
      });
      */
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const sql = 'SELECT * FROM books WHERE id = ?';
      db.get(sql, [id], (err, result) => {
        res.render(
          'book',
          {
            title: 'MyLibrary',
            nav,
            book: result,
          },
        );
      });
    });

  return bookRouter;
}

module.exports = router;

```

In the view file (`./src/views/books.ejs`), we need to change the link URL when you click on a book title. At the moment, it would look like this:
```html
<a class="nav-item nav-link" href="/books/<%=books[i].id%>">
    <%=books[i].title%>
    by (<%=books[i].author%>)
</a>
```
Just change `<%=books[i].id%>` to `<%=books[i]._id%>` - because that's the ID found in MongoDB.

Head over to `http://localhost:4000/books` and you should see a list of books from MongoDB.

When you click on a book title, it will spit out an error because we have worked on that part yet. Let's get that covered...

Open update `bookRoutes.js` to contain this:
```javascript
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongodb server');

          const db = client.db(dbName);
          const collection = await db.collection('books');
          const book = await collection.findOne({ _id: new ObjectID(id) });

          debug(book);
          res.render(
            'book',
            {
              title: 'MyLibrary',
              nav,
              book,
            },
          );
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());

      /* For SQLite:
      const sql = 'SELECT * FROM books WHERE id = ?';
      db.get(sql, [id], (err, result) => {
        res.render(
          'book',
          {
            title: 'MyLibrary',
            nav,
            book: result,
          },
        );
      });
      */
    });
```

Now if you click on a book title, it should display all the details.

Next is Authentication.

## Authentication
This section involve:
* Creating Users
* Authentication
* Authorization
* Passport (from Express)

Create the sign up form. I edited `./src/views/index.ejs` and added this bit:
```html
<div class="row">
    <div class="col-12">
        <h3>Sign Up!</h3>
        <form name="signupForm" action="/auth/signUp" method="post">
            Username: <input name="username" id="username">
            Password: <input type="password" name="password" id="password">
            <input type="submit" value="Sign Up"/>
        </form>
    </div>
</div>
```

After that, we need to create the "Auth Routes". So create `./src/routes/authRoutes.js`. To start, it will this:
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      // req?
      // Need body-parser
      // $ npm install body-parser
    });
}

module.exports = router;

```

So, install body-parser with `$ npm install body-parser`.

This is a middleware. So we need to update `app.js`.
```javascript
const bodyParser = require('body-parser');
app.use(morgan('tiny'));
app.use(bodyParser.json()); // <-- Add this! Make sure it's before the routes
app.use(bodyParser.urlencoded({ extended: false })); // <-- and this!
app.use(express.static(path.join(__dirname, '/public/')));
...
const authRouter = require('./src/routes/authRoutes.js')();
...
app.use('/auth', authRouter);
```

Update `authRoutes.js`:
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
    });

  return authRouter;
}

module.exports = router;

```

So when you submit the Sign Up form, you should see this in the logs:
```json
app:authRoutes { username: 'wenbert', password: 'gwapo' }
```

https://nodewebapps.com/2017/06/18/how-do-nodejs-sessions-work/

## Passport

```
$ npm install passport cookie-parser express-session
```

Install those 2 packages.

Update `app.js` to use those 3:
```javascript
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

...

app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);
```

Let's create the `./src/config/passport.js` file. Here is a sample content of it.

```javascript
const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrives user from session
  passport.deserializeUser((user, done) => {
    // Find user by id
    done(null, user);
  });
};

};
```

Now let's implement `local.strategy`. First, let's install it.
```
$ npm install passport-local
```

Then create `./src/config/strategies/local.strategy.js` with the following contents:
```javascript
const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const user = {
      username, password,
    };
    done(null, user);
  }));
};
```

Update `authRoutes.js` to look like:
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // create user here
      // res.json(req.body);
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}


module.exports = router;

```

Then try to "login". You should see it working as expected. So when you tried to sign-up, the `local.strategy.js` along with `passport` did it's magic. You should see everything "routed" and passed properly.

Update `authRoutes.js` to:
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongodb server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);

          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;

```

Now that we have the user being created, the next part is to actually validate the login - time to sign in.

First, we create the 'sign in' page which just contains the form to login.

Update `authRoutes.js` to accept `nav`.
```javascript
function router(nav) {
  ...
  authRouter.route('/signin')
  .get((req, res) => {
    res.render('signin', {
      nav,
      title: 'signIn'
    });
  });
}
```

And update `app.js`:
```javascript
const authRouter = require('./src/routes/authRoutes.js')(nav);
```

After that let's create the view `./views/signin.ejs`:
```html
<h3>Sign In!</h3>
<form name="signupForm" action="/auth/signin" method="post">
    Username: <input name="username" id="username">
    Password: <input type="password" name="password" id="password">
    <input type="submit" value="Sign In"/>
</form>
```

Update `passport.js`:
```javascript
require('./strategies/local.strategy')(); // <-- add ()
```

Your `signin` route should now look like this:
```javascript
authRouter.route('/signin')
  .get((req, res) => {
    res.render('signin', {
      nav,
      title: 'Sign In',
    });
  })
  .post(passport.authenticate('local', {
    sucessRedirect: '/auth/profile',
    failureRedirect: '/',
  }));
```

`authRoutes.js` finally looks like this;
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function addUser() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the mongodb server');

          const db = client.db(dbName);

          const col = db.collection('users');
          const user = { username, password };
          const result = await col.insertOne(user);

          req.login(result.ops[0], () => {
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In',
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/',
    }));
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });

  return authRouter;
}

module.exports = router;

```

And `local.strategy.js`:
```javascript
const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongodb server');

        const db = client.db(dbName);
        const col = db.collection('users');

        const user = await col.findOne({ username });
        debug('Found username');

        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }));
};

```

### Authorising Users / Protecting routes

So let's restrict our routes. In this example, let's protect `profile`.
The `profile` route in `authRoutes.js` would look like this:
```javascript
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
```

If we want to restrict all of `books` route, we just use this in `bookRoutes.js`
```javascript
function router(nav) {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });

  // bookRouter.route('/')
  // ...
 return bookRouter;
}
```

To logout, do this http://www.passportjs.org/docs/logout/

## Structure and Third-party APIs

* Building a Web Application
* Structure
* Controllers
* Services
* 3rd Party APIs 

### Controllers

When you look at `bookRoutes.js`, you see that it's a bit of a mess. This has been a glaring question on the back of my head since from the beginning. In PHP, we usually a controller to handle these requests. And rightfully so, this video deals with it also.

Let's structure this part properly.

First thing to do is to go to `bookRoutes.js` and do this:
```javascript
const bookController = require('../controllers/bookController.js');
```

And then create the directory `./src/controllers/`.

So `bookController` is going to be a function and then we are going to export it. 
```javascript
function bookController() {
  function getIndex() {

  }
  function getById() {

  }
}
module.exports = bookController;
```

Go to `bookRoutes.js` and move everything inside:
```javascript
  bookRouter.route('/')
    .get((req, res) => {
      // ... Cut the contents ...
    });
```

In the end, the `bookController.js` file would now look like this:
```javascript
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookController');

function bookController(nav) {

  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }

  function getIndex(req, res) {
    /* For MongoDB: */
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    // IFFY
    // (() {} ());
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongodb server');

        const db = client.db(dbName);
        const collection = await db.collection('books');
        const books = await collection.find().toArray();

        res.render(
          'books',
          {
            title: 'MyLibrary',
            nav,
            books,
          },
        );
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());

    /* For SQLite:
    const sql = 'SELECT * FROM books';
    db.all(sql, [], (err, result) => {
      res.render(
        'books',
        {
          title: 'MyLibrary',
          nav,
          books: result,
        },
      );
    });
    */
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to the mongodb server');

        const db = client.db(dbName);
        const collection = await db.collection('books');
        const book = await collection.findOne({ _id: new ObjectID(id) });

        debug(book);
        res.render(
          'book',
          {
            title: 'MyLibrary',
            nav,
            book,
          },
        );
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());

    /* For SQLite:
    const sql = 'SELECT * FROM books WHERE id = ?';
    db.get(sql, [id], (err, result) => {
      res.render(
        'book',
        {
          title: 'MyLibrary',
          nav,
          book: result,
        },
      );
    });
    */
  }

  return {
    middleware,
    getIndex,
    getById,
  };
}

module.exports = bookController;

```

And `bookRoutes.js` finally will be like this:
```javascript
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookController = require('../controllers/bookController.js');

const bookRouter = express.Router();

// The function!
function router(nav) {
  function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav);

  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;

```

Next up are services for API calls.

## API calls with Services

We will be using the BookReads API. Go ahead and grab a developer key from https://www.goodreads.com/api/keys

Let's setup the structure for the services. Create this file: `./src/services/goodreadsService.js`. For now this will be empty.

Then update your `bookRoutes.js`. 
```javascript
const express = require('express');

const bookController = require('../controllers/bookController.js');

const bookRouter = express.Router();

// Add this!
const bookService = require('../services/goodreadsService.js');

function router(nav) {

  // Then pass it to bookController
  const { getIndex, getById, middleware } = bookController(bookService, nav);

  bookRouter.use(middleware);

  bookRouter.route('/')
    .get(getIndex);

  bookRouter.route('/:id')
    .get(getById);

  return bookRouter;
}

module.exports = router;

```

Then in `bookController.js`, it is expected that we update the function definition to something like this.

The plan is that we want the `bookController::getById()` to fetch the "details" from the service before and then render it in the view.

```javascript
function bookController(bookService, nav) {
  //...
  function getById(req, res) {
    // ... inside the async/await block
      // We still need to implement this: bookService.getBookById
      book.details = await bookService.getBookById(book.bookId);
        res.render(
          'book',
          {
            title: 'MyLibrary',
            nav,
            book,
          },
        );
    // ...
  });
}
```

Initially `goodreadsService.js` will look like this:

```javascript
function goodreadsService() {
  function getBookById() {
    return new Promise(((resolve, reject) => {
      resolve({ description: 'our description' });
    }));
  }

  return { getBookById };
}

module.exports = goodreadsService();
```

Then in `./views/book.ejs` add the description like this:
```html
<p>
Details from API: <%=book.details.description%>
</p>
```

Refresh and it should display "our description". So everything works.

So to sum up this part, what we did was:

1. Edit `bookRoutes.js` to declare `const bookService = require('../services/goodreadsService.js');`
1. Then we passed that constant to the controller `const { getIndex, getById, middleware } = bookController(bookService, nav);`
1. Then we accepted that in the controller. `function bookController(bookService, nav) {...}`
1. So that we can use and call from the service. `book.details = await bookService.getBookById(book.bookId);`
1. Then in our view, we call it directly. `Details from API: <%=book.details.description%>`

Note, we have not passed anything. We are simply hard-coding the result. So let's actually query the API to get something.

### Making an actual API call

First we need Axios and xml2js.

```
$ npm install axios xml2js --save
```

We will be querying this XML file:
```
https://www.goodreads.com/book/show/658.xml?key=uUkiJYvQrLQ3IOl9XWow
```
(I am going to reset that API key when I commit this change.)

That will return something like:
```xml
<GoodreadsResponse>
<Request>
<authentication>true</authentication>
<key>
<![CDATA[ uUkiJYvQrLQ3IOl9XWow ]]>
</key>
<method>
<![CDATA[ book_show ]]>
</method>
</Request>
<book>
<id>658</id>
<title>
<![CDATA[ The Kingdom of God Is Within You ]]>
</title>
<isbn>
...
<image_url>
https://images.gr-assets.com/books/1328863873m/658.jpg
</image_url>
...
<description>
<![CDATA[
Banned in Russia, Tolstoy's <i>The Kingdom of God Is Within You</i> was deemed a threat to...
]]>
</description>
....
```

Modify `books.ejs` to contain the image URL.
```javascript
<p>
<img src="<%=book.details.image_url%>"/>
</p>
<p>
Details from API: <%-book.details.description%>
</p>
```

We hard-coded the `658` ID - so let's work on passing an ID to the API.

Before we move forward, open `adminRoutes.js`.
You'll see that the `books` array does not have an ID for it. Let's update that to:
```javascript
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayvich Tolstoy',
    bookId: 656,
    read: false,
  },
  {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    bookId: 24280,
    read: false,
  },
];

```

Then empty out / delete all of the books in MongoDB. You can use your favourite client to do that.

Then go to: http://localhost:4000/admin

That will "insert" all of `books` array into MongoDB. If you have forgotten this, then scroll up ;)

Now, `bookId` should be inside the MongoDB collection.

To pass in the ID we just added, update `goodreadsService.js` to:
```javascript
axios.get('https://www.goodreads.com/book/show/658.xml?key=uUkiJYvQrLQ3IOl9XWow')
// Update to
axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=uUkiJYvQrLQ3IOl9XWow`)
```

In the end, it should look like this:
```javascript
const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsServices');

const parser = xml2js.Parser({ explicitArray: false });

function goodreadsService() {
  function getBookById(id) {
    return new Promise((resolve, reject) => {
      // axios.get('https://www.goodreads.com/book/show/658.xml?key=uUkiJYvQrLQ3IOl9XWow')
      axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=uUkiJYvQrLQ3IOl9XWow`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.GoodreadsResponse.book);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
      // resolve({ description: 'our description' });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();

```

That's it! LOL! Now to build something!
