
var express = require('express'),
    path    = require('path'),
    app     = express();

app.set('base', './app');

app.use(express.static(path.resolve('./app/')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve('./app/index.html'));
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});