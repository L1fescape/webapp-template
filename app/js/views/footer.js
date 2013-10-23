define(['backbone', 'services', 'tpl!templates/footer.tpl'], function(Backbone, Services, tpl) {
  return Backbone.View.extend({
    el: $("#fPageFooter"),

    events: {
    },

    initialize: function() {
      this.render();
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
