module.exports = function(app) {
  var express = require('express');
  var slidesRouter = express.Router();
  var resource = 'slides';
  var db = require('rethinkdb_adapter');
  db.setup('deck', { slides: 'id' });

  slidesRouter.get('/', function(req, res) {
    /*var payload = {};
    payload[resource] = fixtures;
    res.send(payload);*/
    db.findQuery(resource, req.query, function (err, payload) {
      if (err) {
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  slidesRouter.post('/', function(req, res) {
    db.createRecord(resource, req.body[resource], function (err, payload) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(201).send(payload);
      }
    });
  });

  slidesRouter.get('/:id', function(req, res) {
    /*var payload = {};
    payload[resource] = slideBySlug(req.params.id);
    res.send(payload);*/
    var ids = req.params.id.split(',');
    if (ids.length === 1) {
      db.find(resource, ids[0], function (err, payload) {
        if (err) {
          res.sendStatus(500);
        } else {
          if (payload[resource] !== null) {
            res.send(payload);
          } else {
            db.findBySlug(resource, ids[0], function (err, payload) {
              if (err) {
                res.sendStatus(500);
              } else {
                if (payload[resource] !== null && payload[resource] !== void 0) {
                  res.send(payload);
                } else {
                  res.status(404).end();
                }
              }
            });
          }
        }
      });
    } else if (ids.length > 1) {
      db.findMany(resource, ids, function (err, payload) {
        if (err) {
          res.send(500);
        } else {
          res.send(payload);
        }
      });
    }
  });

  slidesRouter.put('/:id', function(req, res) {
    /*var payload = {};
    payload[resource] = slideBySlug(req.params.id);
    res.send(payload);*/
    db.updateRecord(resource, req.params.id, req.body[resource], function (err, payload) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(204).end(); // No Content
      }
    });
  });

  slidesRouter.delete('/:id', function(req, res) {
    db.deleteRecord(resource, req.params.id, function (err) {
      if (err) {
        res.status(500).end();
      } else {
        res.status(204).end(); // No Content
      }
    });
  });

  app.use('/api/slides', slidesRouter);
};

/*var fixtures = [
  { slug: '0', id: '0a', filename: 'http://fpoimg.com/800x600?text=Title'},
  { slug: '1', id: '1a', filename: 'http://fpoimg.com/800x600?text=Section-A', milliseconds: 1000 },
  { slug: '2', id: '2a', filename: 'http://fpoimg.com/800x600?text=Slide-A1', milliseconds: 500 },
  { slug: '3', id: '3a', filename: 'http://fpoimg.com/800x600?text=Slide-A2', milliseconds: 250 },
  { slug: '4', id: '4a', filename: 'http://fpoimg.com/800x600?text=Slide-A3' },
  { slug: '5', id: '5a', filename: 'http://fpoimg.com/800x600?text=Section-B', milliseconds: 300 },
  { slug: '6', id: '6a', filename: 'http://fpoimg.com/800x600?text=Slide-B1', milliseconds: 300 },
  { slug: '7', id: '7a', filename: 'http://fpoimg.com/800x600?text=Slide-B2', milliseconds: 300 },
  { slug: '8', id: '8a', filename: 'http://fpoimg.com/800x600?text=Slide-B3' },
  { slug: '9', id: '9a', filename: 'http://fpoimg.com/800x600?text=The End'},
  { slug: '10', id: '10a', iframeUrl: 'http://dev.w3.org/html5/markup/iframe.html#iframe'},
  { slug: '11', id: '11a', markdown: '# And one more thing, Markdown :)', format: 'title'},
  { slug: '12', id: '12a', code: 'export default Ember.Component.extend();', lang: 'javascript', format: 'code'}
];

var slideBySlug = function(slug) {
  var slides = fixtures.filter(function(item) {
    return item.slug === slug + '';
  });
  return slides[0];
};*/
