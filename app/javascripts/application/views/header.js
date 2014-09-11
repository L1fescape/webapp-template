'use strict';
var Marionette = require('backbone.marionette'),
  Radio = require('backbone.radio'),
  template = require('../templates/header.handlebars'),
  $ = require('jquery');

var headerChannel = Radio.channel('header');
var loginChannel = Radio.channel('login');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'container',

  events: {
    'click .login': 'showLogin'
  },

  initialize: function(){
    headerChannel.comply('add:login', this.addLoginButton, this);
  },

  addLoginButton: function(title, link){
    var button = $('<a/>', {
      text: title,
      href: link
    });
    this.$el.find('.login').append(button);
  },

  showLogin: function(){
    loginChannel.command('login:show');
  }
});
