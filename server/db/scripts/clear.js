var db = require('../index');
var User = require('../../models/user');

User.remove({}, function(err, result){
  if( err || !result ){
    console.log('Error clearing collection.');
  } else {
    console.log('Collection cleared.');
    process.exit(code=0);
  }
});
