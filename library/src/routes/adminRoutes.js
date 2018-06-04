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
      // res.send('inserting books');
    });
  return adminRouter;
}

module.exports = router;
