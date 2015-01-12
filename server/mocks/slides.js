module.exports = function(app) {
  var express = require('express');
  var slidesRouter = express.Router();

  slidesRouter.get('/', function(req, res) {
    res.send({
      'slides': fixtures
    });
  });

  slidesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  slidesRouter.get('/:id', function(req, res) {
    res.send({
      'slides': slideById(req.params.id)
    });
  });

  slidesRouter.put('/:id', function(req, res) {
    res.send({
      'slides': slideById(req.params.id)
    });
  });

  slidesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/slides', slidesRouter);
};

var fixtures = [
  { id: '0', filename: 'http://fpoimg.com/800x600?text=Title'},
  { id: '1', filename: 'http://fpoimg.com/800x600?text=Section-A', milliseconds: 1000 },
  { id: '2', filename: 'http://fpoimg.com/800x600?text=Slide-A1', milliseconds: 500 },
  { id: '3', filename: 'http://fpoimg.com/800x600?text=Slide-A2', milliseconds: 250 },
  { id: '4', filename: 'http://fpoimg.com/800x600?text=Slide-A3' },
  { id: '5', filename: 'http://fpoimg.com/800x600?text=Section-B', milliseconds: 300 },
  { id: '6', filename: 'http://fpoimg.com/800x600?text=Slide-B1', milliseconds: 300 },
  { id: '7', filename: 'http://fpoimg.com/800x600?text=Slide-B2', milliseconds: 300 },
  { id: '8', filename: 'http://fpoimg.com/800x600?text=Slide-B3' },
  { id: '9', filename: 'http://fpoimg.com/800x600?text=The End'},
  { id: '10', iframeUrl: 'http://dev.w3.org/html5/markup/iframe.html#iframe'}
];

var slideById = function(id) {
  var slides = fixtures.filter(function(item) {
    return item.id === id + '';
  });
  return slides[0];
};
