const express = require('express');
const config = require('./middlewares/index');

let app = express();
app = config(app);

app.get('/', (req, res) => {
  res.send('Index');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

