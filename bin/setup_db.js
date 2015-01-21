#!/usr/bin/env node

var r = require('rethinkdb'),
  async = require('async');

var settings = {
  host: process.env.RDB_HOST || 'localhost',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db: process.env.RDB_DB
};

r.connect(settings, function (err, conn) {
  if (err) { throw err; }

  var dbBame = 'http_mocks_db', dbTable = 'slides';

  async.series([
    function (callback) {
      r.dbDrop(dbBame).run(conn, function (/*err, result*/) {
        callback();
      });
    },
    function (callback) {
      r.dbCreate(dbBame).run(conn, callback);
    },
    function (callback) {
      r.db(dbBame).tableCreate(dbTable).run(conn, callback);
    }
  ],
  function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log(JSON.stringify(results));
    }
    process.exit();
  });
});
