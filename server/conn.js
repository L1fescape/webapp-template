var orm = require('orm'),
    settings = require('./settings')

var opts = {
  database : settings.dbname,
  protocol : "mysql",
  host     : settings.dbhost,
  port     : settings.dbport,
  user     : settings.dbuser,
  password : settings.dbpass,
  query    : {
    pool     : false,   // optional, false by default
    debug    : false    // optional, false by default
  }
};

orm.settings.set("instance.returnAllErrors", true);

var db = orm.connect(opts);

exports.db = db;
