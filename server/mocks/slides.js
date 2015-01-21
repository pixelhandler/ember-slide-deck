module.exports = function(app) {
  var express = require('express');
  var slidesRouter = express.Router();

  var resource = 'slides';
  var dbSetupConfig = {};
  dbSetupConfig[resource] = 'id';

  var db = require('rethinkdb_adapter');
  db.setup('http_mock_db', dbSetupConfig);

  slidesRouter.get('/', function(req, res) {
    db.findQuery(resource, req.query, function (err, payload) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send(payload);
      }
    });
  });

  slidesRouter.post('/', function(req, res) {
    db.createRecord(resource, req.body[resource], function (err, payload) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(201).send(payload);
      }
    });
  });

  slidesRouter.get('/:id', function(req, res) {
    var ids = req.params.id.split(',');
    if (ids.length === 1) {
      db.find(resource, ids[0], function (err, payload) {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          if (payload[resource] !== null) {
            res.send(payload);
          } else {
            db.findBySlug(resource, ids[0], function (err, payload) {
              if (err) {
                console.error(err);
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
          console.error(err);
          res.sendStatus(500);
        } else {
          res.send(payload);
        }
      });
    }
  });

  slidesRouter.put('/:id', function(req, res) {
    db.updateRecord(resource, req.params.id, req.body[resource], function (err, payload) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204); // No Content
      }
    });
  });

  slidesRouter.delete('/:id', function(req, res) {
    db.deleteRecord(resource, req.params.id, function (err) {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204); // No Content
      }
    });
  });

  app.use('/api/slides', slidesRouter);
};
