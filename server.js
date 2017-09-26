var express = require('express');

var app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    const newUrl = 'http://' + req.hostname + req.url;
    return res.redirect(newUrl);
  } else {
    return next();
  }
});

app.use(express.static('public'));

app.listen(port, function() {
  console.log('Express server is up on port ' + port);
});

