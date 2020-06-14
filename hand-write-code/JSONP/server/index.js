const express = require('express');
const app = express();

app.get('/', (req, res) => {
  let data = {
    name: 'Horace',
    age: 20
  }
  let { msg, callback } = req.query;
  console.log(msg, '---msg');
  console.log(callback, '---callback');
  res.end(`${callback}(${JSON.stringify(data)})`); // 将数据交给前端的回调
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})