var Marionette = require('backbone.marionette'),
  template = require('./template.handlebars');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'register'
});
