'use strict';
var ItemView = require('../../classes/item-view'),
  Radio = require('backbone.radio'),
  HeaderLinkView = require('./link'),
  template = require('../templates/header.handlebars');

var headerChannel = Radio.channel('header');

module.exports = ItemView.extend({
  template: template,
  childViewContainer: '.user-settings',

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
  }
});
