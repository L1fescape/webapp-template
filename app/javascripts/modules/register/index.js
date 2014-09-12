'use strict';
var Marionette = require('backbone.marionette'),
  RegistrationView = require('./view'),
  Radio = require('backbone.radio');

var headerChannel = Radio.channel('header');

module.exports = Marionette.Module.extend({
  startWithParent: true,
  eventName: 'register',

  region: null,

  initialize: function(Register, app){
    this.region = app.body;

    // Bind events
    headerChannel.comply('click:' + this.eventName, this.showRegistrationForm, this);
  },

  onStart: function(){
    headerChannel.command('add:link', {
      eventName: this.eventName,
      title: 'Register',
      href: '#register'
    });
  },

  showRegistrationForm: function(){
    var view = new RegistrationView(); 
    this.region.show(view);
  }
});

