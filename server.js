var express = require('express');

var app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return next();
  } else {
    const newUrl = 'http://' + req.hostname + req.url;
    res.redirect(newUrl);
  }
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log('Express server is up on port ' + port);
});

