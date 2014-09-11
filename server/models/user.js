var db = require('../db');
var Schema = db.Schema;
var hash = require('mongoose-hash');

// Define the schema
var UserSchema = new Schema({
  user_id: String,
  name: String
});

UserSchema.plugin(hash, {
  field: 'user_id',
  size: 6
});

module.exports = db.model('User', UserSchema);
