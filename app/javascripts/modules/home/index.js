'use strict';
var Marionette = require('backbone.marionette'),
  HomeView = require('./view'),
  Radio = require('backbone.radio');

var routingChannel = Radio.channel('routing');

module.exports = Marionette.Module.extend({
  startWithParent: true,

  region: null,

  initialize: function(Home, app){
    this.region = app.body;

    // Bind events
    routingChannel.on('home', this.showHome, this);
  },

  showHome: function(){
    this.region.show(new HomeView());
  }
});

