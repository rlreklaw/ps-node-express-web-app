var express = require('express');
var chalk = require('chalk');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello from my library app');
});

app.listen(3000, () => {
    console.log(`listening on port ${chalk.green('3000')}`);
});
