const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));

// app.use((req, res, next) => {
//   debug('My Middleware');
//   next();
// });

app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const nav = [
  { link: '/', title: 'Home' },
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
  { link: '/auth/signin', title: 'Sign In' },
];

const bookRouter = require('./src/routes/bookRoutes.js')(nav);
const adminRouter = require('./src/routes/adminRoutes.js')(nav);
const authRouter = require('./src/routes/authRoutes.js')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html'));
  res.render(
    'index',
    {
      title: 'MyLibrary',
      nav,
    },
  );
});

app.listen(port, () => {
  // console.log(`listening on port ${chalk.green(3000)}`);
  debug(`listening on port ${chalk.green(port)}`);
});
