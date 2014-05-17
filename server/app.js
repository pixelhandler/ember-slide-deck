/**
  @module app
  @main app
**/
var express = require('express');
var cors = require('cors');

/**
  Cors settings
**/
var options = {
  origin: function(origin, callback){
    var allowed = ['http://localhost:8000'];
    var isAllowed = allowed.indexOf(origin) !== -1;
    callback(null, isAllowed);
  },
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
};

/**
  Configure application settings
  @config app
**/
var app = express();

app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/**
  enable CORs pre-flighting, include before other routes
**/
app.options('*', cors(options));

/**
  Load application routes
**/
require('./routes/ping')(app, cors(options));

require('./routes/slides')(app, cors(options));

/**
  Listen or export if required by testing
**/
if (!module.parent) {
  var port = process.env.SERVER_PORT || 8888;
  app.listen(port);
  console.log('CORS-enabled web server listening on port '+ port);
} else {
  module.exports = app;
}
