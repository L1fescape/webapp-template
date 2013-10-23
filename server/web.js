var 

  // expressjs
  express = require('express'),
  app = express(),

  // http server
  http = require('http'),
  httpServer = http.createServer(app),
  
  // import settings
  settings = require("./settings");


// configure the server
app.configure(function() {
  // static pages and content. app dir is in a parent level directory, so we need
  // to reference that
  var dir = __dirname.split("/");
  dir.pop();
  app.use(express.static(dir.join("/") + settings.webDir));
  // used for reading post body variables
  app.use(express.bodyParser());
});


// options for all routes
app.options("*", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, sessionID');
  res.end();
});



/*
 * Helper Functions
 */
function required(params, type) {
  type = type || "body";
  return function(req, res, cb) {
    if (params.every(function (elem) { return req[type].hasOwnProperty(elem); }))
      cb()
    else
      res.send(400, {status:400, message: 'Missing required ' + type + ' parameters.'});
  };
};

// proxy the api request
function apiRequest(options, postData, res) {
  // if `res` is undefined, no `postData` has been sent in.
  if (typeof res === 'undefined') {
    res = postData;
    postData = '';
  }

  var req = http.request(options, function(apiResponse) {
    res.writeHead(apiResponse.statusCode, {
      'content-type': apiResponse.headers['content-type']
    });
    apiResponse.on('data', function(chunk) {
      res.write(chunk);
    });
    apiResponse.on('end', function() {
      res.end();
    });
  })
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  })
  req.write(postData);
  req.end();
}

//  
function setOptions(opts, postData) {
  var defOpts = {
    host : settings.apiHost,
    port : settings.apiPort,
    path : settings.apiPrefix,
    method : 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if (typeof postData !== 'undefined')
    defOpts.headers['Content-Length'] = postData.length;
  var keys = Object.keys(defOpts);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (opts[k] !== undefined)
      defOpts[k] = opts[k];
  }
  return defOpts;
};




/*
 * API Routes
 */



// Example Login proxy
app.post("/users/login", function(req, res) {
  // grab post data
  var postData = JSON.stringify({
    username : req.body.username,
    password : req.body.password
  });
  // set request options
  var options = setOptions({
    path: settings.apiPrefix + '/users/login',
    method: 'POST'
  }, postData);
  // make the request
  apiRequest(options, postData, res);
});


// run http server
httpServer.listen(settings.webPort);

console.log("Listening on port", settings.webPort);
