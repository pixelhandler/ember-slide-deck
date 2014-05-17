/**
  @module app
  @submodule routes/slides
  @requires app, rethinkdb_adapter
**/
var debug = require('debug')('slides');
var node_env = process.env.NODE_ENV || 'development';

/**
  Setup database
**/
var db = require('../lib/rethinkdb_adapter');
db.setup('deck', { slides: 'id' });

/**
  Exports {Function} routes for Slide resources

  @main routes/slides
  @param {Object} app - express application instance
  @param {Function} options - middleware callback (cors options)
**/
module.exports = function(app, cors) {

  /**
    Create a slide

    Route: (verb) POST /slides
    @async
  **/
  app.post('/slides', cors, function (req, res) {
    console.log('post#slides', req.body);
    db.createRecord('slides', req.body.slide, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    (Read) Find slides accepts query object

    Route: (verb) GET /slides
    @async
  **/
  app.get('/slides', cors, function (req, res) {
    db.findQuery('slides', req.query, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    (Read) Find a slide by id

    Route: (verb) GET /slides/:id
    @async
  **/
  app.get('/slides/:id', cors, function (req, res) {
    db.find('slides', req.params.id, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    Update a slide by id

    Route: (verb) PUT /slides/:id
    @async
  **/
  app.put('/slides/:id', cors, function (req, res) {
    db.updateRecord('slides', req.params.id, req.body.slide, function (err, payload) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(payload);
      }
    });
  });

  /**
    Delete a slide by id

    Route: (verb) DELETE /slides/:id
    @async
  **/
  app.del('/slides/:id', cors, function (req, res) {
    db.deleteRecord('slides', req.params.id, function (err) {
      if (err) {
        debug(err);
        res.send(500);
      } else {
        res.send(204); // No Content
      }
    });
  });

};
