// connect to database
var db = require('./conn').db,
    orm = require('orm');
    _ = require('underscore'),
    models = {};

models.user = db.define("user", {
  username        :   String,
  password        :   String,
  firstName       :   String,
  lastName        :   String,
  email           :   String
});


exports.models = models;
