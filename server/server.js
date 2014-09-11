// Setup
// =======================================

// Import packages
var express = require('express');
var app = express();
var serveStatic = require('serve-static')
var bodyParser = require('body-parser');

// Configure app to use bodyParser() for parsing POST body parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Variables and settings
var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';


// Routes
// =======================================

// Config
// ------

// Serve static frontend assets (must be absolute path)
var dir = __dirname.split("/");
dir.pop();
app.use(serveStatic(dir.join("/") + '/dist'));

// Create router
var router  = express.Router();

// Set router prefix
app.use('/api', router);

// Middleware for all api requests 
router.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Import resources
var Users = require('./api/user');


// Routes
// ------

// Create a new user
router.post('/users', function(req, res){
  var user_info = {
    name: req.body.name
  };

  Users.create(user_info)
    .then(function(user){
      // return newly created user
      return res.json({
        success: true,
        results: [user],
        errors: []
      });
    })
    .fail(function(error){
      // return any errors encountered
      res.statusCode = 400;
      return res.json({
        success: false,
        results: [],
        errors: [error]
      });
    });
});

// Get a user's info
router.get('/users/:user_id', function(req, res){
  var userId = req.params.user_id;

  // find a user based on userId
  Users.find(userId)
    .then(function(user){
      // return user info
      return res.json({
        success: true,
        results: [user],
        errors: []
      });
    })
    .fail(function(error){
      // return any errors encountered
      res.statusCode = 400;
      return res.json({
        success: false,
        results: [],
        errors: [error]
      });
    });
});


// Start server
// =======================================

app.listen(port, host, function() {
  console.log('Listening on %s:%d', host, port);
});
