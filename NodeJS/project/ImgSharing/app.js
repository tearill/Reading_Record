const express = require('express');
const config = require('./middlewares/index');

const app = express();
config(app);

// app.get('/', (req, res) => {
//   res.send('Index test');
// });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

