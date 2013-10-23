var 

  // expressjs
  express = require('express'),
  app = express(),

  // database models
  models = require('./models').models

  // http server
  http = require('http'),
  httpServer = http.createServer(app),
  
  // import settings
  settings = require("./settings");


// used for reading post body variables
app.use(express.bodyParser());


/*
 * Helper functions
 */


// Checks to see if a request containes required header or body params. If a type is not
// specified, default to checking for body params.
function required(params, type) {
  type = type || "body";
  return function(req, res, cb) {
    if (params.every(function (elem) { return req[type].hasOwnProperty(elem); }))
      cb()
    else
      res.send(400, {status:400, message: 'Missing required ' + type + ' parameters.'});
  };
};



/*
 * Routes
 */


// Example POST User Login
app.post("/users/login", required(['username', 'password']), function(req, res) {
  var respObj = {},
      username = req.body.username,
      password = req.body.password;
  models.user.find({ username: username, password: password }, function (err, user) {
    if (!err && user && user.length) {
      respObj = user[0];
      res.write(JSON.stringify(respObj));
      res.end();
    }
    else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.write('{ "status" : "error", "message" : "Invalid username/password." }');
      res.end();
    }
  });
});




// run mock api server
httpServer.listen(settings.apiPort);

console.log("Listening on port", settings.apiPort);
