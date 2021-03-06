var app = require('express')(),
    winston = require('winston'),
    bodyParser = require('body-parser'),
    csv = require('express-csv');

/*
* Get winston to log uncaught exceptions and to not exit
*/
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});

// expects a json array in req.body
app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : "csv",
        description:"For an array of arrays respond with a csv document"
    });
});

app.post('/', function(req, res) {
    res.csv(req.body);
});

var PORT = process.env.PORT || 80;
app.listen(PORT);
logger.log('info', 'Running csv service on http://localhost:' + PORT);
