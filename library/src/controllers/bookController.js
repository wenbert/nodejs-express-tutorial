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
