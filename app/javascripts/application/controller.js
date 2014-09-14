'use strict';
var Radio = require('backbone.radio');

var routingChannel = Radio.channel('routing'); 

module.exports = {
  home: function() {
    routingChannel.trigger('home');
  }
};
