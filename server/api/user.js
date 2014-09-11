var Q = require('q');
var User = require('../models/user');

module.exports = {
  create: function( user_info ){
    var defer = Q.defer();

    if( !user_info.name ){
      return defer.reject('Please provide a name.');
    }

    User.create({ name: user_info.name }, function(err, user){
      if( err || !user ){
        defer.reject('Could not create user.');
      } else {
        defer.resolve(user);
      }
    });

    return defer.promise;
  },
  find: function( userId ){
    var defer = Q.defer();

    // Check if the userId is valid
    if( !userId ){
      return defer.reject('You must provide a user id.');
    }

    User.findOne({ user_id: userId }, function(err, user){
      if( err || !user ){
        defer.reject('Could not find user.');
      } else {
        defer.resolve(user);
      }
    });

    return defer.promise;
  }
};
