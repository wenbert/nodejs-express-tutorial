var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');

var app = express();

//app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd')));

app.get('/', function(req, res) {
    //res.send('Hello from my library app');
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, function() {
    //console.log(`listening on port ${chalk.green(3000)}`);
    debug(`listening on port ${chalk.green(3000)}`);
});
