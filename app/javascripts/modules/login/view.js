var Marionette = require('backbone.marionette'),
  template = require('./templates/login.handlebars');

module.exports = Marionette.ItemView.extend({
  template: template,
  className: 'login'
});
