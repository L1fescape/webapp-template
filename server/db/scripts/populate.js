var db = require('../index');
var User = require('../../models/user');

var users = [{
  name: 'Andrew',
  email: 'test@test.com',
  password: 'test'
}];

User.create(users, function(err, result){
  if( err || !result ){
    console.log('Error populating database.');
  } else {
    console.log('Users created.');
    process.exit(code=0);
  }
});
