const express = require('express');
const index = express.Router();
const image = express.Router();
const indexController = require('../controllers/index');
const imageController = require('../controllers/image');

index.get('/', indexController.index);
image.get('/:img_id', imageController.index);
image.post('/', imageController.create);
image.post('/:img_id/like', imageController.like);
image.post('/:img_id/comment', imageController.comment);

module.exports = (app) => {
  // index.get('/', index);
  app.use('/', index);
  app.use('/image', image);
}