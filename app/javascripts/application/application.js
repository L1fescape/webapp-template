'use strict';
var Backbone = require('backbone'),
  Marionette = require('backbone.marionette'),
  HeaderView = require('./views/header');

var app = new Marionette.Application({
  regions: {
    header: '#header',
    body: '#body'
  }
});

app.addInitializer(function(){
  // Start routing
  Backbone.history.start();

  // Show the header
  this.header.show(new HeaderView());
});

module.exports = app;
