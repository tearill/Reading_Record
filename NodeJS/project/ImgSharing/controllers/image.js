module.exports = {
  index: (req, res) => {
    // res.send('image index controller test');
    // res.render('image');
    const viewModel = {
      image: {
        uniqueId: 1,
        title: 'img1',
        description: 'test image',
        filename: 'img1.png',
        views: 0,
        likes: 0,
        timestamp: Date.now()
      },
      comment: [
        {
          image_id: 1,
          email: '1105317666@qq.com',
          name: 'Horace',
          comment: 'test comment',
          timestamp: Date.now()
        },
        {
          image_id: 1,
          email: '1105317666@qq.com',
          name: 'Horace',
          comment: 'test comment2',
          timestamp: Date.now()
        },
      ],
    };
    res.render('image', viewModel);
  },
  create: (req, res) => {
    res.send('image create test');
  },
  like: (req, res) => {
    res.send('image like test');
  },
  comment: (req, res) => {
    res.send('image comment test');
  }
};