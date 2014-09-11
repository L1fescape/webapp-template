'use strict';
var Marionette = require('backbone.marionette'),
  LoginView = require('./view'),
  Radio = require('backbone.radio');

var loginChannel = Radio.channel('login');
var headerChannel = Radio.channel('header');

module.exports = Marionette.Module.extend({
  startWithParent: true,

  region: null,
  router: null,

  initialize: function(Login, app){
    this.region = app.body;

    // Bind events
    loginChannel.comply('login:show', this.showLoginForm, this);
  },

  onStart: function(){
    headerChannel.command('add:login', 'Login', '#login');
  },

  showLoginForm: function(){
    var login = new LoginView(); 
    this.region.show(login);
  }
});

