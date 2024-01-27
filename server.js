const express = require('express');

const app = express();

app.use(express.static('public'));

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/api/data', (req, res) => {
  res.send({
    status: 1,
    message: 'hello world!',
  });
});

app.listen(3000, () => {
  console.log('server started at 3000');
});
