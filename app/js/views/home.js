define(['backbone', 'services', 'tpl!templates/home.tpl'], 
function(Backbone, Services, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.render();
      
      NAMESPACE.dispatcher.on('views:closePage', this.close, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    close: function() {
      NAMESPACE.dispatcher.off();
      this.unbind();
      this.undelegateEvents();
      this.$el.html("");
    }
  });
});
