// Configure backbone's jQuery object
var Backbone = require('backbone');
Backbone.$ = require('jquery');
// Configure lodash templates
var _ = require('lodash');
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
