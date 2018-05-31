const express = require('express');

const bookRouter = express.Router();

const books = [
  {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false,
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
