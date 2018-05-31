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