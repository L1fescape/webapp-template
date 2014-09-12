'use strict';
var Marionette = require('backbone.marionette'),
  Radio = require('backbone.radio'),
  template = require('../templates/link.handlebars');

var headerChannel = Radio.channel('header');

module.exports = Marionette.ItemView.extend({
  template: template,
  tagName: 'li',

  events: {
    'click': 'triggerEvent'
  },

  constructor: function(options){
    console.log(options);
    this.title = options.title;
    this.href = options.href;
    this.eventName = options.eventName;
    this.preventDefault = options.preventDefault;

    Marionette.ItemView.apply(this, arguments);
  },

  triggerEvent: function(evt){
    if( this.preventDefault ){
      evt.preventDefault();
    }

    console.log('click');
    headerChannel.command('click:' + this.eventName, evt);
  },

  serializeData: function(){
    return {
      'title': this.title,
      'href': this.href
    };
  }
});
