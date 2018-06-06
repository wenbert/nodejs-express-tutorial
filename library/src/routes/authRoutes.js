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
