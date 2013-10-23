define(['backbone', 'services', 'tpl!templates/header.tpl'], function(Backbone, Services, tpl) {
  return Backbone.View.extend({
    el: $("#hPageHeader"),

    events: {
    },

    initialize: function() {
      this.render();
      this.on('hide', this.hide, this);
      this.on('show', this.show, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    hide: function() {
      $(this.el).hide();
    },

    show: function() {
      if (!$(this.el).is(":visible")) {
        this.render();
        $(this.el).show();
      }
    }
  });
});
