module.exports = {
  index: (req, res) => {
    // res.send('home index controller test');
    // res.render('index'); // 渲染模板
    const viewModel = {
      images: [
        {
          uniqueId: 1,
          title: 'img1',
          description: 'img1',
          filename: 'img1.png',
          views: 0,
          likes: 0,
          timestamp: Date.now()
        },
        {
          uniqueId: 2,
          title: 'img2',
          description: 'img2',
          filename: 'img2.png',
          views: 0,
          likes: 0,
          timestamp: Date.now()
        },
      ]
    };
    res.render('index', viewModel);
  },
};
