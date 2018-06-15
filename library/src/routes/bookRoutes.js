const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookController = require('../controllers/bookController.js');

const bookRouter = express.Router();

// The function!
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
