var 

    // express
    express = require('express'),
    app = express(),

    // http servers
    http = require('http'),
    https = require('https'),

    // read from/write to the filesystem
    fs = require('fs'),

    // node orm
    orm = require('orm'),
    uuid = require('node-uuid'),
    crypto = require('crypto'),

    // external api files. in this case, models and tools.
    models = require('./models').models
    tools = require('./tools').tools,

    // application variables
    httpsEnabled = false, // set to enable/disable https
    privKeyLoc = "some/path/privatekey.pem",
    certLoc = "some/path/certificate.pem",
    httpPort = 3000,
    httpsPort = 3333;

    
// http server
var httpServer = http.createServer(app);
// if true, load https certificates and start the https server
if (httpsEnabled) {
  var privateKey = fs.readFileSync(privKeyLoc).toString();
  var certificate = fs.readFileSync(certLoc).toString();
  var credentials = { key : privateKey, cert : certificate };
  var httpsServer = https.createServer(credentials, app);
}

// used for reading post body variables
app.use(express.bodyParser());

// When making requests from the browser, javascript will ask for what options are available.
// You can do this on a per-route basis. In this case, use the same headers for all routes.
app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, session_id');
  res.end();
});

// template POST route
app.post("/route/:someID/update", function (req, res) {
  // object that will hold reponse data. will be stringified before
  // being sent back with the response.
  var respObj = {},
  // get variables passed via the route
      myID = req.params.someID,
  // get post body variables
      myVar1 = req.body.myVar1,
      myVar2 = req.body.myVar2;

  // add models to our database. in this case,
  // create a user and return that created user id and session token
  models.user.create([{
    some_key1 : myVar1,
    some_key2 : myVar2
  }], function (err, user) {
    // if there was no error, return what we just created.
    if (!err) {
      res.writeHead(201, {'content-type': 'application/json'});
      respObj.status = "success";
      respObj.userId = user[0].id;
      // stringify the response object and write it to the response body
      res.write(JSON.stringify(respObj));
      // send back the response
      res.end();
    }
    // node orm threw an error
    else {
      // in our models, some_key1 is set to be unique. check if node orm threw that error when
      // we tried to insert a new user.
      if (err.toString().indexOf("unique") > -1) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write('{"status":"error","messageId":"1"}');
        res.end();
      }
      // handle all other cases
      else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write('{ "status" : "error", "messageId" : "4" }');
        res.end();
      }
    }
  });
});

// template GET route
app.get("/some/route", function (req, res) {
  // object that will hold reponse data. will be stringified before
  // being sent back with the response.
  var respObj = {};
  // grab any variables from the header. in this case we use session_id
  // to identify which user is making the request and ensure they are 
  // authenticated.
  var session_id = req.headers.session_id;
  // make sure that session exists
  models.session.find({ uuid : session_id }, function (err, session) {
    if (session.length && !err) {
      respObj.status = "success";
      res.write(JSON.stringify(respObj));
      res.end();
    }
    else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.write('{ "status" : "error", "messageId" : "[message error id for session not existing]" }');
      res.end();
    }
  });
});

// run https server if https is enabled
if (httpsEnabled) {
  httpsServer.listen(httpsPort);
  console.log("HTTPS listening on port", httpsPort);
}
// run http server
httpServer.listen(httpPort);
console.log("Listening on port", httpPort);
