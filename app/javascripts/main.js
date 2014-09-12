// Run initializers and import the application
require('./application/init');
var Application = require('./application/application');

// Include modules
Application.module('login', require('./modules/login'));
Application.module('register', require('./modules/register'));

// Start the application
Application.start();
