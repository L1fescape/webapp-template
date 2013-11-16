define(['backbone', 'services', 'events', 'tpl!templates/about.tpl'], 
function(Backbone, Services, Events, tpl) {
  return Backbone.View.extend({
    el: $("#dPage"),

    events: {
    },

    initialize: function() {
      this.render();
      
      Events.on('views:closePage', this.close, this);
    },

    render: function() {
      this.$el.html(tpl({}));
    },

    close: function() {
      console.log("about close");
      Events.off();
      this.unbind();
      this.undelegateEvents();
      this.$el.html("");
    }
  });
});
