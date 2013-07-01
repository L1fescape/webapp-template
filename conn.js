var orm = require('orm');

var opts = {
  database : "[Database Name]",
  protocol : "mysql",
  host     : "localhost",
  port     : 3306,         // optional, defaults to database default
  user     : "[username]",
  password : "[password]",
  query    : {
    pool     : false,   // optional, false by default
    debug    : false    // optional, false by default
  }
};

orm.settings.set("instance.returnAllErrors", true);

var db = orm.connect(opts);

exports.db = db;
