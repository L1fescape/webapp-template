'use strict';
var Backbone = require('backbone'),
  Marionette = require('backbone.marionette'),
  HeaderView = require('./views/header'),
  AppRouter = require('./router'),
  AppController = require('./controller');

var app = new Marionette.Application({
  regions: {
    header: '#header',
    body: '#body'
  }
});

app.addInitializer(function(){
  // Show the header
  this.header.show(new HeaderView());
  
  // Create application router
  this.router = new AppRouter({ controller: AppController });
  // Start routing
  Backbone.history.start();
});

module.exports = app;
