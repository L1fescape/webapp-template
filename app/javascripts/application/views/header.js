'use strict';
var ItemView = require('../../classes/item-view'),
  Radio = require('backbone.radio'),
  HeaderLinkView = require('./link'),
  template = require('../templates/header.handlebars');

var headerChannel = Radio.channel('header');
var routingChannel = Radio.channel('routing');

module.exports = ItemView.extend({
  template: template,
  childViewContainer: '.user-settings',

  events: {
    'click .title': 'routeHome'
  },

  initialize: function(){
    headerChannel.comply('add:link', this.addHeaderLink, this);
  },

  addHeaderLink: function(options){
    options = options || {};

    var link = new HeaderLinkView({
      title: options.title,
      href: options.href,
      eventName: options.eventName,
      preventDefault: options.preventDefault || true
    });

    this.addChildView(link);
  },

  routeHome: function(evt){
    evt.preventDefault();

    // TODO we need the url to change as well for this route. We could just 
    // remove the line above where we preventDefault, but if the route happens
    // to not change then no events will be triggered and nothing new will be 
    // rendered (e.g. if we're on the home page and click "Login" link, the url 
    // will not change but what's being rendered on the page will. If we want 
    // to navigate back to the home page, we can't because clicking the home 
    // link won't trigger a url change). 
    routingChannel.trigger('home');
  }
});
