const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'SA',
  password: 'pb4Ugo2c',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  // database: '...',

  options: {
    encrypt: false // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan('combined'));

app.use((req, res, next) => {
  debug('my middleware');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Library',
    nav
  });
});

app.listen(port, () => {
  debug(`listening at port ${chalk.green(port)}`);
});
